

import React, { useState } from 'react';
import FileUploadDropzone from '../components/FileUploadDropzone';
import { summarizeText } from '../services/api';

const DocumentProcessor: React.FC = () => {
  const [fileText, setFileText] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [processedText, setProcessedText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (file: File, text: string) => {
    setFileText(text);
    setFileName(file.name);
    setLoading(true);
    setError(null);

    try {
      const summarized = await summarizeText( text);
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

      {loading && <p className="mt-4 text-blue-500">Summarizing...</p>}
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
        </div>
      )}
    </div>
  );
};

export default DocumentProcessor;
