import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './App.css';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

// Add error logging
const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

// Log any unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

// Log any uncaught errors
window.addEventListener('error', (event) => {
  console.error('Uncaught error:', event.error);
});
