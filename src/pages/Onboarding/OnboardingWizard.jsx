import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import ProgressBar from '../../components/onboarding/ProgressBar';
import PersonalInfo from './PersonalInfo';
import BusinessInfo from './BusinessInfo';
import Preferences from './Preferences';

const OnboardingWizard = () => {
  const navigate = useNavigate();
  const { userData, updateUserData } = useAppContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [isCurrentStepValid, setIsCurrentStepValid] = useState(false);
  
  const steps = [
    { 
      id: 1, 
      name: 'Personal', 
      component: <PersonalInfo onValidation={setIsCurrentStepValid} />,
      validate: () => {
        const { personalInfo } = userData;
        return personalInfo.name?.trim() && personalInfo.email?.trim() && /\S+@\S+\.\S+/.test(personalInfo.email);
      }
    },
    { 
      id: 2, 
      name: 'Business', 
      component: <BusinessInfo onValidation={setIsCurrentStepValid} />,
      validate: () => {
        const { businessInfo } = userData;
        return businessInfo.companyName?.trim() && businessInfo.industry && businessInfo.size;
      }
    },
    { 
      id: 3, 
      name: 'Preferences', 
      component: <Preferences onValidation={setIsCurrentStepValid} />,
      validate: () => true // No validation needed for preferences as they have defaults
    },
  ];
  
  // Validate current step when component mounts or step changes
  useEffect(() => {
    const isValid = steps[currentStep - 1]?.validate();
    setIsCurrentStepValid(!!isValid);
  }, [currentStep, userData, steps]);
  
  const nextStep = () => {
    if (currentStep < steps.length) {
      const isValid = steps[currentStep - 1]?.validate();
      if (isValid) {
        setCurrentStep(currentStep + 1);
        // Scroll to top when changing steps
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setIsCurrentStepValid(false);
      }
    } else {
      // Mark onboarding as complete and redirect to dashboard
      updateUserData(4, { isOnboarded: true });
      navigate('/dashboard');
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // Scroll to top when changing steps
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const CurrentStepComponent = steps[currentStep - 1]?.component;
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Welcome to Our Platform</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">Let's get you set up in just a few steps.</p>
        </div>
        
        <ProgressBar currentStep={currentStep} totalSteps={steps.length} />
        
        <div className="mt-10 bg-white dark:bg-gray-800 shadow rounded-lg p-6 sm:p-8 transition-colors duration-200">
          {CurrentStepComponent}
          
          <div className="mt-8 pt-5 border-t border-gray-200 dark:border-gray-700 flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Back
            </button>
            <button
              type="button"
              onClick={nextStep}
              disabled={!isCurrentStepValid}
              className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                isCurrentStepValid 
                  ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500' 
                  : 'bg-blue-400 cursor-not-allowed'
              } focus:outline-none focus:ring-2 focus:ring-offset-2`}
            >
              {currentStep === steps.length ? 'Complete Setup' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;
