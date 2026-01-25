const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { getPDFMetadata, extractPDFText } = require('../services/pdfParser');

router.post('/analyze', upload.single('contract'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.file; // get file info
    console.log('📄 Processing PDF:', file.originalname);

    // extract text from pdf
    const text = await extractPDFText(file.buffer);
    const metadata = await getPDFMetadata(file.buffer);

    // return extracted text (for testing)
    res.json({
      success: true,
      file: {
        name: file.originalname,
        size: file.size,
        pages: metadata?.pages
      },
      extracted: {
        length: text.length,
        preview: text.substring(0, 500) + '...', //first 500 chars
        fullText: text
      }
    });

  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;