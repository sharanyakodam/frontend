import { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

const PersonalInfo = ({ onValidation }) => {
  const { userData, updateUserData, validatePersonalInfo } = useAppContext();
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Validate form on mount and when userData changes
  useEffect(() => {
    if (onValidation) {
      const { isValid } = validatePersonalInfo(userData.personalInfo);
      onValidation(isValid);
    }
  }, [userData.personalInfo, onValidation, validatePersonalInfo]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newPersonalInfo = {
      ...userData.personalInfo,
      [name]: value
    };
    
    // Update the user data with the new personal info
    updateUserData({
      personalInfo: newPersonalInfo
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Only validate if the field has been touched
    const { errors: newErrors } = validatePersonalInfo(userData.personalInfo);
    setErrors(prev => ({
      ...prev,
      [name]: newErrors[name]
    }));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Tell Us About Yourself</h2>
        <p className="text-gray-600 mt-2">We'll use this information to personalize your experience.</p>
      </div>
      
      <div className="space-y-6">
        <div className="relative">
          <label 
            htmlFor="name" 
            className="block text-sm font-medium text-gray-700 mb-1 transition-all duration-200"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="name"
              name="name"
              value={userData.personalInfo.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`block w-full px-3 py-2 rounded-md border-2 placeholder:text-base placeholder:font-semibold placeholder:text-gray-600 ${
                errors.name 
                  ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                  : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-gray-400'
              } transition-all duration-200 outline-none`}
              placeholder="Enter your full name"
              required
              autoComplete="name"
              autoFocus
            />
            {userData.personalInfo.name && !errors.name && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.name}
            </p>
          )}
        </div>
        
        <div className="relative">
          <label 
            htmlFor="email" 
            className="block text-sm font-medium text-gray-700 mb-1 transition-all duration-200"
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={userData.personalInfo.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`block w-full px-3 py-2 rounded-md border-2 placeholder:text-base placeholder:font-semibold placeholder:text-gray-600 ${
                errors.email 
                  ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                  : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-gray-400'
              } transition-all duration-200 outline-none`}
              placeholder="Enter your email address"
              required
              autoComplete="email"
            />
            {userData.personalInfo.email && !errors.email && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          {errors.email ? (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.email}
            </p>
          ) : (
            <p className="mt-1 text-xs text-gray-500">We'll never share your email with anyone else.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
