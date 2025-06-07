import React from 'react';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;
  
  const getStepLabel = (index) => {
    switch (index) {
      case 0: return 'Personal';
      case 1: return 'Business';
      case 2: return 'Preferences';
      default: return `Step ${index + 1}`;
    }
  };

  return (
    <div className="w-full">
      {/* Progress line */}
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 dark:bg-blue-900 dark:text-blue-200">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-blue-600 dark:text-blue-300">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
          <div
            style={{ width: `${progress}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-300 ease-in-out"
          />
        </div>
      </div>

      {/* Step indicators */}
      <div className="flex justify-between px-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            <div 
              className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium mb-1 transition-colors duration-200 ${
                index < currentStep - 1 
                  ? 'bg-green-500 text-white dark:bg-green-600' 
                  : index === currentStep - 1 
                    ? 'bg-blue-600 text-white dark:bg-blue-700 ring-4 ring-blue-200 dark:ring-blue-800' 
                    : 'bg-gray-200 text-gray-500 dark:bg-gray-600 dark:text-gray-300'
              }`}
            >
              {index < currentStep - 1 ? (
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <span 
              className={`text-xs font-medium ${
                index === currentStep - 1 
                  ? 'text-blue-600 dark:text-blue-400 font-semibold' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {getStepLabel(index)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
