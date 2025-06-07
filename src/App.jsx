import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import OnboardingWizard from './pages/Onboarding/OnboardingWizard';
import Dashboard from './pages/Dashboard/Dashboard';
import Welcome from './pages/Welcome';
import './App.css';

const AppContent = () => {
  const { userData } = useAppContext();
  const isOnboarded = userData?.isOnboarded;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Routes>
        <Route path="/" element={isOnboarded ? <Navigate to="/dashboard" replace /> : <Welcome />} />
        <Route 
          path="/onboarding/*" 
          element={isOnboarded ? <Navigate to="/dashboard" replace /> : <OnboardingWizard />} 
        />
        <Route 
          path="/dashboard" 
          element={isOnboarded ? <Dashboard /> : <Navigate to="/" replace />} 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <AppProvider>
    <Router>
      <AppContent />
    </Router>
  </AppProvider>
);

export default App;
