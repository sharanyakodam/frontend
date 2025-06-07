import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import ProgressBar from '../../components/onboarding/ProgressBar';

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const Preferences = () => {
  const navigate = useNavigate();
  const { userData, updateUserData } = useAppContext();
  const [preferences, setPreferences] = useState({
    layout: userData.preferences?.layout || 'default',
    notifications: userData.preferences?.notifications ?? true,
  });

  const handleSave = () => {
    updateUserData({
      preferences: {
        ...preferences,
      },
      isOnboarded: true, // Mark onboarding as complete
    });
    navigate('/dashboard');
  };


  // Layout options
  const layouts = [
    { id: 'default', label: 'Default' },
    { id: 'compact', label: 'Compact' },
    { id: 'spacious', label: 'Spacious' },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <ProgressBar currentStep={3} totalSteps={3} />
      
      <h1 className="text-2xl font-bold mb-6">Preferences</h1>
      
      <div className="space-y-8">
        {/* Layout Selection */}
        <div>
          <h2 className="text-lg font-medium mb-4">Dashboard Layout</h2>
          <div className="grid grid-cols-3 gap-4">
            {layouts.map((layout) => (
              <button
                key={layout.id}
                onClick={() => setPreferences(p => ({ ...p, layout: layout.id }))}
                className={`p-4 border rounded-lg text-center ${
                  preferences.layout === layout.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {layout.label}
                {preferences.layout === layout.id && (
                  <div className="mt-2">
                    <CheckIcon />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications Toggle */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h3 className="font-medium">Email Notifications</h3>
            <p className="text-sm text-gray-500">Get updates about your account</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={preferences.notifications}
              onChange={(e) => setPreferences(p => ({ ...p, notifications: e.target.checked }))}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default Preferences;
