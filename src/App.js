// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RoomDetails from './components/RoomDetals.jsx';
import UserHomePage from './pages/user/UserHomepage.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserHomePage />} />
        <Route path="/room/:id" element={<RoomDetails />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;
