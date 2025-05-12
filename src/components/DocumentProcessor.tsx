import React, { useState } from 'react';
import FileUploadDropzone from './FileUploadDropzone';
import SummaryOutput from './SummaryOutput';
import LoadingIndicator from './LoadingIndicator';
import { ArrowDown } from 'lucide-react';

// Mock document data type
type DocumentData = {
  text: string;
  fileName: string;
  fileType: string;
};

const DocumentProcessor: React.FC = () => {
  const [documentData, setDocumentData] = useState<DocumentData | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSummarizing, setIsSummarizing] = useState<boolean>(false);

  // Mock document parsing function
  const handleDocumentUpload = (file: File) => {
    setIsLoading(true);
    setSummary(null);
    
    // Simulate API call to parse document
    setTimeout(() => {
      const mockText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
      ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
      in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat 
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
      totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae 
      dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
      sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.`;
      
      setDocumentData({
        text: mockText,
        fileName: file.name,
        fileType: file.type,
      });
      setIsLoading(false);
    }, 1500);
  };

  // Mock summary generation function
  const handleSummarize = () => {
    if (!documentData) return;
    
    setIsSummarizing(true);
    
    // Simulate API call to summarize document
    setTimeout(() => {
      const mockSummary = `This document discusses the principles of lorem ipsum and its applications.
      Key points:
      - Lorem ipsum is placeholder text commonly used in design
      - It has roots in classical Latin literature from 45 BC
      - The text has been used by typographers and designers for centuries
      - Lorem ipsum demonstrates text layout without distracting content`;
      
      setSummary(mockSummary);
      setIsSummarizing(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col space-y-8 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Document AI Assistant</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Upload your documents and our AI will help you understand them better. 
          Get summaries, insights, and answers to your questions in seconds.
        </p>
      </div>

      {/* File upload area */}
      <FileUploadDropzone onFileUpload={handleDocumentUpload} />

      {/* Arrow indicator when document is uploaded */}
      {(documentData || isLoading) && (
        <div className="flex justify-center my-2">
          <ArrowDown className="h-8 w-8 text-gray-400 animate-bounce" />
        </div>
      )}

      {/* Loading state for document processing */}
      {isLoading && <LoadingIndicator message="Processing document..." />}

      {/* Parsed document display */}
      {documentData && !isLoading && (
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Document Content</h2>
              <p className="text-sm text-gray-500">{documentData.fileName}</p>
            </div>
            <button
              onClick={handleSummarize}
              disabled={isSummarizing}
              className={`px-5 py-2.5 rounded-lg transition-all ${
                isSummarizing
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow hover:shadow-md'
              }`}
            >
              {isSummarizing ? 'Summarizing...' : 'Summarize'}
            </button>
          </div>
          <div className="max-h-64 overflow-y-auto bg-gray-50 rounded-lg p-4 border border-gray-200">
            <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700">
              {documentData.text}
            </pre>
          </div>
        </div>
      )}

      {/* Loading state for summarization */}
      {isSummarizing && <LoadingIndicator message="Generating summary..." />}

      {/* Summary output */}
      {summary && <SummaryOutput summary={summary} />}
    </div>
  );
};

export default DocumentProcessor;