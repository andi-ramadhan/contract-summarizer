const express = require('express');
const multer = require('multer');
const app = express();
const upload = multer({ dest: 'uploads/' })
const cors = require('cors');

app.use(cors()); // enable cors for all origins

const port = 4000;

app.get('/health', (req, res) => {
  res.send('/health fine')
});

app.post('/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    console.log('File uploaded:', req.file);
    res.json({
      success: true,
      message: 'File uploaded successfully',
      file: {
        originalname: req.file.originalname,
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, message: 'Internal server error during upload' });
  }
});

const server = app.listen(port, async () => {
  console.log(`Server listening on http://localhost:${port}`);
});

server;