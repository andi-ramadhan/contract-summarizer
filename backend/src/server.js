require('dotenv').config();
const express = require('express');
const cors = require('cors');
const analyzeRouter = require('./routes/analyze');

const app = express();

// it called middleware
app.use(cors()); // enable cors for all origins
app.use(express.json());

// health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

app.use('/api', analyzeRouter);

const PORT = process.env.PORT || 5555;
app.listen(PORT, async () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});