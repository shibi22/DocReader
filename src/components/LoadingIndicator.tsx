import React from 'react';

interface LoadingIndicatorProps {
  message?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 animate-fadeIn">
      <div className="relative h-12 w-12 mb-4">
        {/* Spinner animation */}
        <div className="absolute inset-0 border-t-4 border-indigo-600 border-solid rounded-full animate-spin"></div>
        <div className="absolute inset-0 border-4 border-gray-200 border-solid rounded-full opacity-25"></div>
      </div>
      
      <div className="text-gray-700 text-center">
        <p>{message}</p>
      </div>
      
      {/* Shimmer effect for loading lines */}
      <div className="w-full max-w-md mt-6 space-y-3">
        {[1, 2, 3].map((i) => (
          <div 
            key={i} 
            className="h-4 bg-gray-200 rounded-md overflow-hidden relative"
            style={{ width: `${75 + Math.random() * 25}%` }}
          >
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingIndicator;