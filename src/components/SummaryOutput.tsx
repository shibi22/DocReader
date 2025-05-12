import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface SummaryOutputProps {
  summary: string;
}

const SummaryOutput: React.FC<SummaryOutputProps> = ({ summary }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger animation when summary is available
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [summary]);

  return (
    <div 
      className={`bg-white rounded-2xl shadow-md p-6 border border-emerald-200 transform transition-all duration-500 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="flex items-center mb-4">
        <Sparkles className="h-5 w-5 text-emerald-500 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">AI Summary</h2>
      </div>
      
      <div className="rounded-lg bg-gray-50 p-5 border border-gray-200">
        <div className="font-mono text-sm leading-relaxed text-gray-800 whitespace-pre-line">
          {summary}
        </div>
      </div>
      
      <div className="mt-4 text-right">
        <button className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors">
          Copy to clipboard
        </button>
      </div>
    </div>
  );
};

export default SummaryOutput;