import { useEffect, useRef } from 'react';

const PreferenceCard = ({
  id,
  name,
  description,
  preview,
  isSelected,
  onSelect,
  type = 'option',
  groupName
}) => {
  const cardRef = useRef(null);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(id);
    }
  };

  // Focus the card when it becomes selected
  useEffect(() => {
    if (isSelected && cardRef.current) {
      cardRef.current.focus();
    }
  }, [isSelected]);

  return (
    <div
      ref={cardRef}
      role={type === 'radio' ? 'radio' : 'button'}
      aria-checked={isSelected}
      tabIndex={0}
      onClick={() => onSelect(id)}
      onKeyDown={handleKeyDown}
      className={`relative rounded-lg border p-4 cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
        isSelected 
          ? 'border-blue-500 bg-blue-50 shadow-md transform -translate-y-0.5' 
          : 'border-gray-300 hover:border-gray-400 hover:shadow-sm'
      }`}
      aria-label={`Select ${name}: ${description}`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-0.5">
          <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
            isSelected 
              ? 'border-blue-500 bg-blue-500' 
              : 'border-gray-300 bg-white'
          }`}>
            {isSelected && (
              <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                <path d="M3.707 9.293a1 1 0 0 1-1.414 0l-1.414-1.414a1 1 0 1 1 1.414-1.414L3 7.086l5.293-5.293a1 1 0 0 1 1.414 1.414L5.12 9.293a1 1 0 0 1-1.414 0z" />
              </svg>
            )}
          </div>
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900">{name}</p>
          <p className="mt-1 text-xs text-gray-500">{description}</p>
          
          {/* Preview Container */}
          <div className="mt-3 h-24 rounded-md overflow-hidden border border-gray-200 bg-white">
            {preview}
          </div>
        </div>
      </div>
      
      {isSelected && (
        <div className="absolute top-2 right-2 flex items-center justify-center h-5 w-5 rounded-full bg-blue-500">
          <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default PreferenceCard;
