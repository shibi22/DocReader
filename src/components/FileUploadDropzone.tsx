import React, { useCallback, useState } from 'react';
import { Upload, FileType2 } from 'lucide-react';
import { extractTextFromPdf } from '../utils/pdfUtils';
import { extractTextFromDocx } from '../utils/docxUtils';

interface FileUploadDropzoneProps {
  onFileUpload: (file: File, text: string) => void;
}

const FileUploadDropzone: React.FC<FileUploadDropzoneProps> = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragCount, setDragCount] = useState(0);
  
  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCount(count => count + 1);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);
  
  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCount(count => count - 1);
    if (dragCount === 1) {
      setIsDragging(false);
    }
  }, [dragCount]);
  
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setDragCount(0);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
      e.dataTransfer.clearData();
    }
  }, []);
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  };
  
  const processFile = async (file: File) => {
    // Check file type
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a PDF, DOCX, or TXT file.');
      return;
    }
    
    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB.');
      return;
    }

    // Process the file based on its type
    let text = '';
    if (file.type === 'application/pdf') {
      text = await extractTextFromPdf(file);
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      text = await extractTextFromDocx(file);
    } else if (file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = () => {
        text = reader.result as string;
        onFileUpload(file, text);  // Pass file and text to the parent
      };
      reader.readAsText(file);
      return; // For text files, we handle this asynchronously
    }

    onFileUpload(file, text);  // Pass file and extracted text to the parent
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
        isDragging 
          ? 'border-indigo-500 bg-indigo-50' 
          : 'border-gray-300 bg-white hover:border-gray-400'
      }`}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="file-upload"
        className="hidden"
        accept=".pdf,.docx,.txt"
        onChange={handleFileSelect}
      />
      
      <label 
        htmlFor="file-upload" 
        className="flex flex-col items-center justify-center py-10 cursor-pointer"
      >
        <div className={`p-4 rounded-full bg-indigo-50 mb-4 transition-transform duration-300 ${isDragging ? 'scale-110' : 'hover:scale-105'}`}>
          {isDragging ? (
            <FileType2 className="h-12 w-12 text-indigo-600" />
          ) : (
            <Upload className="h-12 w-12 text-gray-400" />
          )}
        </div>
        
        <h3 className="text-lg font-medium text-gray-900 mb-1">
          {isDragging ? 'Drop to upload your file' : 'Drag & drop your document here'}
        </h3>
        
        <p className="text-sm text-gray-500 mb-4">
          Supports PDF, DOCX, and TXT files (up to 10MB)
        </p>
        
        <button className="px-5 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-400 transition-all">
          Browse files
        </button>
      </label>
    </div>
  );
};

export default FileUploadDropzone;
