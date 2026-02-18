import React, { useState, useEffect } from 'react';
import IntroSequence from './components/Intro/IntroSequence';
import MainUI from './components/Layout/MainUI';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const [showMainUI, setShowMainUI] = useState(false);
  const [currentPage, setCurrentPage] = useState('landing');

  useEffect(() => {
    // Simple routing based on URL path
    const path = window.location.pathname;
    if (path === '/dashboard') {
      setCurrentPage('dashboard');
      setShowMainUI(true); // Skip intro for dashboard
    } else {
      setCurrentPage('landing');
    }
  }, []);

  // If on dashboard page, show dashboard directly
  if (currentPage === 'dashboard') {
    return <Dashboard />;
  }

  return (
    <div className="bg-background min-h-screen text-foreground font-sans selection:bg-primary selection:text-white">
      {!showMainUI && (
        <IntroSequence onComplete={() => setShowMainUI(true)} />
      )}

      {showMainUI && (
        <MainUI />
      )}
    </div>
  );
}

export default App;
