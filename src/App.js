// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RoomDetails from './components/RoomDetals.jsx';
import UserHomePage from './pages/user/UserHomepage.js';
import ManageAccommodations from './pages/admin/ManageAccommodations.jsx'; // Import the ManageAccommodations component

function App() {
  return (
    <Router>
      <Routes>
        {/* Set ManageAccommodations as the component for the root path */}
        <Route path="/" element={<ManageAccommodations />} />
        <Route path="/user-homepage" element={<UserHomePage />} />
        <Route path="/room/:id" element={<RoomDetails />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;
