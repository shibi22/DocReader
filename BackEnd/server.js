const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const pdfParse = require("pdf-parse");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(fileUpload());
app.use(express.json());

// Extract text from PDF
app.post("/upload", async (req, res) => {
  const file = req.files?.file;
  if (!file) return res.status(400).json({ error: "No file uploaded" });

  try {
    const pdfData = await pdfParse(file.data);
    res.json({ text: pdfData.text });
  } catch (error) {
    console.error("PDF parse error:", error);
    res.status(500).json({ error: "Failed to extract text" });
  }
});

// Summarize using Ollama
app.post("/summarize", async (req, res) => {
  const text = req.body.text?.slice(0, 3000); // prevent model overload
  if (!text) return res.status(400).json({ error: "No text provided" });

  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "mistral", // or your preferred model
      prompt: `Summarize the following document:\n\n${text}`,
      stream: false
    });

    res.json({ summary: response.data.response.trim() });
  } catch (error) {
    console.error("Ollama error:", error.message);
    res.status(500).json({ error: "Summarization failed" });
  }
});

app.listen(3001, () => {
  console.log("🚀 Backend running at http://localhost:3001");
});
