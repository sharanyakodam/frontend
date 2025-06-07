import { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

const industries = [
  'Technology',
  'Finance',
  'Healthcare',
  'Education',
  'Retail',
  'Manufacturing',
  'Other'
];

const companySizes = [
  { id: '1-10', label: '1-10 employees' },
  { id: '11-50', label: '11-50 employees' },
  { id: '51-200', label: '51-200 employees' },
  { id: '201-500', label: '201-500 employees' },
  { id: '501+', label: '501+ employees' }
];

const BusinessInfo = ({ onValidation }) => {
  const { userData, updateUserData, validateBusinessInfo } = useAppContext();
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  // Validate form on mount and when userData changes
  useEffect(() => {
    if (onValidation) {
      const { isValid } = validateBusinessInfo(userData.businessInfo);
      onValidation(isValid);
    }
  }, [userData.businessInfo, onValidation, validateBusinessInfo]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newBusinessInfo = {
      ...userData.businessInfo,
      [name]: value
    };
    updateUserData({ businessInfo: newBusinessInfo });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const { errors: newErrors } = validateBusinessInfo(userData.businessInfo);
    setErrors(prev => ({
      ...prev,
      [name]: newErrors[name]
    }));
  };
  
  const handleSizeChange = (sizeId) => {
    const newBusinessInfo = {
      ...userData.businessInfo,
      size: sizeId
    };
    updateUserData({ businessInfo: newBusinessInfo });
    // Clear error when user selects size
    setErrors(prev => ({ ...prev, size: '' }));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Business Information</h2>
        <p className="text-gray-600 mt-2">Tell us about your company to help us tailor your experience.</p>
      </div>
      <div className="space-y-6">
        {/* Team Members Section */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Team Members</label>
          <p className="text-xs text-gray-500 mb-2">Add your company users (at least one).</p>
          {(Array.isArray(userData.businessInfo.users) ? userData.businessInfo.users : []).map((user, idx) => (
            <div key={idx} className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2 items-center mb-2 min-w-0">
              <input
                type="text"
                className="w-full px-3 py-2 rounded-md border-2 placeholder:text-base placeholder:font-semibold placeholder:text-gray-600 border-gray-300 min-w-0"
                placeholder="Name"
                value={user.name || ''}
                onChange={e => {
                  const newUsers = [...(userData.businessInfo.users || [{}])];
                  newUsers[idx] = { ...newUsers[idx], name: e.target.value };
                  updateUserData({ businessInfo: { ...userData.businessInfo, users: newUsers } });
                }}
                required
              />
              <input
                type="email"
                className="w-full px-3 py-2 rounded-md border-2 placeholder:text-base placeholder:font-semibold placeholder:text-gray-600 border-gray-300 min-w-0"
                placeholder="Email"
                value={user.email || ''}
                onChange={e => {
                  const newUsers = [...(userData.businessInfo.users || [{}])];
                  newUsers[idx] = { ...newUsers[idx], email: e.target.value };
                  updateUserData({ businessInfo: { ...userData.businessInfo, users: newUsers } });
                }}
                required
              />
              <input
                type="text"
                className="w-full px-3 py-2 rounded-md border-2 placeholder:text-base placeholder:font-semibold placeholder:text-gray-600 border-gray-300 min-w-0"
                placeholder="Role (optional)"
                value={user.role || ''}
                onChange={e => {
                  const newUsers = [...(userData.businessInfo.users || [{}])];
                  newUsers[idx] = { ...newUsers[idx], role: e.target.value };
                  updateUserData({ businessInfo: { ...userData.businessInfo, users: newUsers } });
                }}
              />
              {((userData.businessInfo.users || []).length > 1) && (
                <button
                  type="button"
                  className="ml-2 px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                  onClick={() => {
                    const newUsers = [...(userData.businessInfo.users || [{}])];
                    newUsers.splice(idx, 1);
                    updateUserData({ businessInfo: { ...userData.businessInfo, users: newUsers } });
                  }}
                  aria-label="Remove user"
                >
                  &times;
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="mt-2 px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
            onClick={() => {
              const users = Array.isArray(userData.businessInfo.users) ? userData.businessInfo.users : [];
              const newUsers = [...users, { name: '', email: '' }];
              updateUserData({ businessInfo: { ...userData.businessInfo, users: newUsers } });
            }}
          >
            + Add User
          </button>
        </div>
        <div className="relative">
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Company Name <span className="text-red-500">*</span></label>
          <div className="relative">
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={userData.businessInfo.companyName || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`block w-full px-3 py-2 rounded-md border-2 placeholder:text-base placeholder:font-semibold placeholder:text-gray-600 ${
                errors.companyName 
                  ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                  : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-gray-400'
              } transition-all duration-200 outline-none`}
              placeholder="Enter your company name"
              required
              autoComplete="organization"
              autoFocus
            />
            {userData.businessInfo.companyName && !errors.companyName && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          {errors.companyName && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.companyName}
            </p>
          )}
        </div>
        <div className="relative">
          <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">Industry <span className="text-red-500">*</span></label>
          <select
            id="industry"
            name="industry"
            value={userData.businessInfo.industry}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`block w-full px-3 py-2 rounded-md border-2 placeholder:text-base placeholder:font-semibold placeholder:text-gray-600 ${
              errors.industry 
                ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-gray-300'
            } transition-all duration-200 outline-none`}
            required
          >
            <option value="">Select an industry</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
          {userData.businessInfo.industry && !errors.industry && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
          {errors.industry && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.industry}
            </p>
          )}
        </div>
        <div className="relative">
          <p className="text-sm font-medium text-gray-700 mb-2">Company Size <span className="text-red-500">*</span></p>
          <div className="grid grid-cols-1 gap-2">
            {companySizes.map((size) => (
              <label key={size.id} className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                userData.businessInfo.size === size.id
                  ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-400'
              }`} htmlFor={`size-${size.id}`}>
                <input
                  id={`size-${size.id}`}
                  name="size"
                  type="radio"
                  checked={userData.businessInfo.size === size.id}
                  onChange={() => handleSizeChange(size.id)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  required
                />
                <span className="ml-3 block text-sm font-medium text-gray-700">{size.label}</span>
                {userData.businessInfo.size === size.id && (
                  <svg className="ml-2 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </label>
            ))}
            {errors.size && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.size}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessInfo;
