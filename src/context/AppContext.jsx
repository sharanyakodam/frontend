import { createContext, useState, useCallback, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // Simple user data state
  const [userData, setUserData] = useState({
    personalInfo: { name: '', email: '' },
    businessInfo: { companyName: '', industry: '', size: '' },
    isOnboarded: false
  });

  // Update function that handles nested state updates
  const updateUserData = useCallback((updates) => {
    setUserData(prev => {
      // Handle nested updates for personalInfo and businessInfo
      const updatedData = { ...prev };
      
      if (updates.personalInfo) {
        updatedData.personalInfo = {
          ...prev.personalInfo,
          ...updates.personalInfo
        };
      }
      
      if (updates.businessInfo) {
        updatedData.businessInfo = {
          ...prev.businessInfo,
          ...updates.businessInfo
        };
      }
      
      // Handle top-level updates (like isOnboarded)
      const { personalInfo, businessInfo, ...topLevelUpdates } = updates;
      
      return {
        ...prev,
        ...updatedData,
        ...topLevelUpdates
      };
    });
  }, []);

  // Validate personal info
  const validatePersonalInfo = useCallback((personalInfo) => {
    const errors = {};
    
    if (!personalInfo?.name?.trim()) {
      errors.name = 'Name is required';
    } else if (personalInfo.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    if (!personalInfo?.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(personalInfo.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }, []);

  // Validate business info
  const validateBusinessInfo = useCallback((businessInfo) => {
    const errors = {};
    
    if (!businessInfo?.companyName?.trim()) {
      errors.companyName = 'Company name is required';
    } else if (businessInfo.companyName.trim().length < 2) {
      errors.companyName = 'Company name must be at least 2 characters';
    }
    
    if (!businessInfo?.industry) {
      errors.industry = 'Industry is required';
    }
    
    if (!businessInfo?.size) {
      errors.size = 'Company size is required';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }, []);

  // Complete onboarding
  const completeOnboarding = useCallback(() => {
    setUserData(prev => ({
      ...prev,
      isOnboarded: true
    }));
  }, []);

  // Reset onboarding function
  const resetOnboarding = useCallback(() => {
    setUserData({
      personalInfo: { name: '', email: '' },
      businessInfo: { companyName: '', industry: '', size: '', users: [] },
      preferences: {},
      isOnboarded: false
    });
    localStorage.removeItem('userData');
  }, []);

  return (
    <AppContext.Provider value={{ 
      userData, 
      updateUserData,
      resetOnboarding,
      validatePersonalInfo,
      validateBusinessInfo,
      completeOnboarding
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
