import React, { useState } from 'react';
import FileUploadDropzone from '../components/FileUploadDropzone';
import { summarizeText } from '../services/api';

const DocumentProcessor: React.FC = () => {
  const [fileText, setFileText] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [processedText, setProcessedText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Speak the summarized text using browser's speech synthesis
  const speakSummary = () => {
    if ('speechSynthesis' in window && processedText) {
      const utterance = new SpeechSynthesisUtterance(processedText);
      utterance.lang = 'en-US';
      utterance.rate = 1;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    } else {
      alert('Speech synthesis not supported in this browser.');
    }
  };

  const handleFileUpload = async (file: File, text: string) => {
    setFileText(text);
    setFileName(file.name);
    setLoading(true);
    setError(null);

    try {
      const summarized = await summarizeText(text);
      setProcessedText(summarized);
    } catch (err: any) {
      setError('Failed to summarize the document.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Document Processor</h2>

      <FileUploadDropzone onFileUpload={handleFileUpload} />

      {fileText && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Extracted Text:</h3>
          <textarea
            value={fileText}
            readOnly
            rows={10}
            className="w-full border border-gray-300 p-4 mt-2"
          />
        </div>
      )}

      {loading && <p className="mt-4 text-blue-500">🔄 Summarizing...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {processedText && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Processed Text:</h3>
          <textarea
            value={processedText}
            readOnly
            rows={10}
            className="w-full border border-gray-300 p-4 mt-2"
          />

          {/* 🔊 Speak the summary button */}
          <button
            onClick={speakSummary}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            🔊 Speak Summary
          </button>
        </div>
      )}
    </div>
  );
};

export default DocumentProcessor;
