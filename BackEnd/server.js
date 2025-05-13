const express = require('express');
const multer = require('multer');
const cors = require('cors');


const app = express();
const upload = multer();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Summarization using Ollama (Mistral)
async function summarizeWithMistral(prompt) {
  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'mistral',
      prompt: `Summarize the following text:\n\n${prompt}`,
      stream: false
    })
  });

  const data = await response.json();

  if (!data || !data.response) {
    throw new Error('No response from Mistral');
  }

  return data.response.trim();
}

// Endpoint for document text processing
app.post('/process-text', upload.none(), async (req, res) => {
  const { text } = req.body;

  if (!text || text.length === 0) {
    return res.status(400).json({ error: 'No text provided' });
  }

  try {
    const summary = await summarizeWithMistral(text.slice(0, 3000)); // Truncate long input
    res.json({ processedText: summary });
  } catch (err) {
    console.error('Summarization error:', err.message);
    res.status(500).json({ error: 'Failed to summarize the document.' });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
