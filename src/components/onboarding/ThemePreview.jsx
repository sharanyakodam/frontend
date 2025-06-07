const ThemePreview = ({ theme }) => {
  if (theme.id === 'system') {
    return (
      <div className="relative h-20 rounded-md overflow-hidden border border-gray-200">
        <div className="absolute inset-0 flex">
          <div className="w-1/2 h-full bg-white p-2 text-xs text-gray-900">
            <div className="h-1 w-3/4 mb-1 bg-blue-500 rounded-full"></div>
            <div className="h-1 w-1/2 bg-blue-500 rounded-full opacity-50"></div>
          </div>
          <div className="w-1/2 h-full bg-gray-900 p-2 text-xs text-white">
            <div className="h-1 w-3/4 mb-1 bg-blue-400 rounded-full"></div>
            <div className="h-1 w-1/2 bg-blue-400 rounded-full opacity-50"></div>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-medium bg-white/90 px-2 py-0.5 rounded-full border border-gray-200">
            Aa
          </span>
        </div>
      </div>
    );
  }

  const isDark = theme.id === 'dark';
  const bgColor = isDark ? 'bg-gray-900' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const borderColor = isDark ? 'border-gray-700' : 'border-gray-200';
  const primaryColor = isDark ? 'bg-blue-400' : 'bg-blue-500';

  return (
    <div className={`h-20 rounded-md p-2 text-xs ${bgColor} ${textColor} border ${borderColor}`}>
      <div className="flex items-start">
        <div className="flex-1">
          <div className={`h-1.5 mb-1.5 ${primaryColor} rounded-full w-3/4`}></div>
          <div className="h-1 ${primaryColor} rounded-full w-1/2 opacity-50"></div>
          <div className="flex items-center mt-2">
            <div className={`w-2 h-2 rounded-full mr-1 ${primaryColor}`}></div>
            <div className={`w-1 h-1 rounded-full mr-1 ${primaryColor} opacity-50`}></div>
            <div className={`w-1 h-1 rounded-full ${primaryColor} opacity-25`}></div>
          </div>
        </div>
        <div className="w-6 h-6 rounded border flex items-center justify-center ml-2">
          <svg 
            className="w-4 h-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {isDark ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            )}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ThemePreview;
