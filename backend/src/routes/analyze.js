const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { extractPDFText } = require('../services/pdfParser');
const { analyzeContract } = require('../services/gemini');
const { uploadPDF, saveAnalysis, getAnalysis } = require('../services/supabase');


router.post('/analyze', upload.single('contract'), async (req, res) => {
  const startTime = Date.now();

  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.file; // get file info
    console.log('\n🚀 Starting analysis:', file.originalname);

    console.log('📤 Step 1/4: Uploading to storage...');
    const fileUrl = await uploadPDF(file.buffer, file.originalname);

    console.log('📝  Step 2/4: Extracting text...');
    const text = await extractPDFText(file.buffer);

    console.log('🤖  Step 3/4: Saving to database...');
    const analysis = await analyzeContract(text);

    console.log('💾  Step 4/4: Saving to database...');
    const processingTime = Date.now() - startTime;

    const savedAnalysis = await saveAnalysis({
      fileName: file.originalname,
      fileSize: file.size,
      fileUrl: fileUrl,
      analysis: analysis,
      processingTime: processingTime
    });

    console.log(`✅ Complete in ${processingTime}ms\n`);

    // return analysis
    res.json({
      success: true,
      analysisId: saveAnalysis.id,
      analysis: analysis,
      metadata: {
        fileName: file.originalname,
        processingTime: processingTime,
      }
    });

  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/analysis/:id', async (req, res) => {
  try {
    const analysis = await getAnalysis(req.params.id);
    res.json({ success: true, data: analysis });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;