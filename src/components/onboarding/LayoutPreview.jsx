const LayoutPreview = ({ layoutId }) => {
  return (
    <div className="h-20 rounded-md overflow-hidden border border-gray-200 bg-white">
      {layoutId === 'default' && (
        <div className="h-full flex">
          <div className="w-1/4 h-full bg-gray-100 border-r border-gray-200"></div>
          <div className="flex-1 p-1.5">
            <div className="h-1/3 mb-1.5 bg-blue-50 border border-blue-100 rounded-sm"></div>
            <div className="h-2/3 grid grid-cols-2 gap-1">
              <div className="bg-green-50 border border-green-100 rounded-sm"></div>
              <div className="bg-purple-50 border border-purple-100 rounded-sm"></div>
            </div>
          </div>
        </div>
      )}
      
      {layoutId === 'compact' && (
        <div className="h-full p-1 grid grid-cols-3 gap-1">
          <div className="bg-blue-50 border border-blue-100 rounded-sm"></div>
          <div className="bg-green-50 border border-green-100 rounded-sm"></div>
          <div className="bg-purple-50 border border-purple-100 rounded-sm"></div>
          <div className="bg-yellow-50 border border-yellow-100 rounded-sm"></div>
          <div className="bg-pink-50 border border-pink-100 rounded-sm"></div>
          <div className="bg-indigo-50 border border-indigo-100 rounded-sm"></div>
        </div>
      )}
      
      {layoutId === 'spacious' && (
        <div className="h-full p-2 space-y-2">
          <div className="h-1/3 bg-blue-50 border border-blue-100 rounded-sm"></div>
          <div className="h-1/3 bg-green-50 border border-green-100 rounded-sm"></div>
          <div className="h-1/3 bg-purple-50 border border-purple-100 rounded-sm"></div>
        </div>
      )}
    </div>
  );
};

export default LayoutPreview;
