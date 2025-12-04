export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    const { text } = await request.json();

    if (!text) {
      return new Response(
        JSON.stringify({ error: "Missing contract text" }),
        { status: 400 }
      );
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${env.GEMINI_API_KEY}`;

    const prompt = `
Summarize the following contract text.
Your summary must include:
- Purpose of the aggrement
- Duties of each party
- Payment terms
- Duration & termination
- Liabilities & risks
- Any unusual clauses
- A simple eplanation for non-lawyers

Be concise but legally acurate as how the work contract regulation on the country.
Contract text begins below:
${text}
`;  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      }),
    });

    const data = await response.json();

    const summary =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "No summary generated.";

    return new Response(JSON.stringify({ summary }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  },
};