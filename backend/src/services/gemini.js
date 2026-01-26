import { GoogleGenAI } from '@google/genai';

const genAI = new GoogleGenAI({});

function createSystemPrompt() {
  return `
You are an expert in Indonesian employment law (UU Ketenagakerjaan No.13/2003 and UU Cipta Kerja).
Your task: Analyze empoloyment contracts and identify legal risks for workers. Explain for non-law people and minimize the difficult language for non-law people.
CRITICAL: Respond ONLY with valid JSON. No markwodn, no code blocks, no extra text.
DO ALL THE RESPONSE IN HUMBLE INDONESIAN LANGUAGE.
`;
}

function createAnalysisPrompt(contractText) {
  return `
  ${createSystemPrompt()}
  
  Analyze this Indonesian employment contract:
  ${contractText}
  Respond with this EXACT JSON structure:
  {
    "risk_score": <number 1-10, where 10 = highest risk>,
    "contract_type": <PKWT|PKKWT|Freelance|Unknown>",
    "red_flags": [
      {
        "category": "<salary|leave|termination|overtime|probation|other>",
        "severity": "<critical|high|medium|low>",
        "issue": "<brief issue description>",
        "detail": "<detailed explanation>",
        "recommendation": "<actionable advice for worker>"
      }
    ],
    "green_flags": [
      "<positive aspect 1>",
      "<positive aspect 2>"
    ],
    "summary": "<2-3 sentence overall assessment>",
    "key_actions": [
      "<recommended action 1 for worker>",
      "<recommended action 2>",
    ]
  }

  Focus on:
  - Salary and benefits clarity
  - Working hours and overtime
  - Leave policies (cuti, sick leave, maternity)
  - Termination conditions and notice period
  - Probation period legality
  - Penalties and fines
  - Non-compete clauses

  Return ONLY the JSON, nothing else.
  `;
}

// helper to safely extract text from various possible Gemini response shapes
async function extractGenAIText(result) {
  if (!result) throw new Error('Empty response from Gemini API');

  // quick helpers
  const isString = (value) => typeof value === 'string' && value.trim().length > 0;
  const MIN_LEN = 8; // minimal length for AI response text

  // recursion with cycle detection to find first plausible text
  function findText(node, visited = new Set(), depth = 0) {
    if (!node || typeof node !== 'object' || visited.has(node) || depth > 8) return null;
    visited.add(node);

    // direct strings on common keys
    const directKeys = ['text', 'outputText', 'content', 'message', 'response', 'output', 'snippet'];
    for (const key of Object.keys(node)) {
      const val = node[key];

      if (isString(val) && val.trim().length >= MIN_LEN) return val;

      // sometimes 'content' or 'message' is an array containing objects with text
      if (Array.isArray(val)) {
        for (const item of val) {
          if (isString(item) && item.trim().length >= MIN_LEN) return item;
          if (typeof item === 'object') {
            // some SDK shapes use { type: 'output_text', text: '...' }
            if (isString(item.text) && item.text.trim().length >= MIN_LEN) return item.text;
            const nested = findText(item, visited, depth + 1);
            if (nested) return nested;
          }
        }
      }

      if (typeof val === 'object') {
        const nested = findText(val, visited, depth + 1);
        if (nested) return nested;
      }
    }

    return null;
  }

  // handle common quick shapes
  if (result.response && typeof result.response.text === 'function') {
    const t = await result.response.text();
    if (isString(t) && t.trim().length >= MIN_LEN) return t;
  }

  if (isString(result) && result.length >= MIN_LEN) return result;
  if (isString(result.text) && result.text.length >= MIN_LEN) return result.text;
  if (Array.isArray(result.candidates) && result.candidates.length > 0) {
    // some SDK returns candidates with nested content
    const candidate = result.candidates[0];
    const byCandidate = findText(candidate);
    if (byCandidate) return byCandidate;
  }

  // generic recursive search across the whole response
  const found = findText(result);
  if (found) return found;

  const keys = Object.keys(result || {});
  throw new Error(`Unexpected Gemini response shape (keys: ${keys.join(', ')})`);
}

export async function analyzeContract(contractText) {
  try {
    console.log('🤖 Calling Gemini API...');

    const content = createAnalysisPrompt(contractText);

    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: content,
    });

    console.log('✅ Received Gemini response');

    const response = await extractGenAIText(result);

    let cleanResponse = response
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .trim();

    const analysis = JSON.parse(cleanResponse);

    // validation
    if (typeof analysis.risk_score !== 'number' || !Array.isArray(analysis.red_flags)) {
      throw new Error('Invalid analysis structure from AI');
    }

    console.log(`📊 Risk Score: ${analysis.risk_score}/10`);
    console.log(`🚩 Red Flags: ${analysis.red_flags.length}`);
    
    return analysis;

  } catch (error) {
    console.error('Gemini API error:', error);

    const msg = (error && error.message) || String(error);

    if (msg.includes('API key')) {
      throw new Error('Invalid AI API key, please check your .env file.');
    }

    if (msg.includes('quota')) {
      throw new Error('AI API quota exceeded. Please try again later.');
    }

    throw new Error(`AI analysis failed: ${msg}`);
  }
}