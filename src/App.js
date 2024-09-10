import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/Navigation';
import MainContent from './components/MainContent'; 
import './App.css';

const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Navigation /> 
        <MainContent />
      </div>
    </Router>
  );
}

export default App;
