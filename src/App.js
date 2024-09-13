import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ManageAccommodations from './pages/admin/ManageAccommodations.jsx';
import ManageRooms from './pages/admin/ManageRoom.js';
import AdminDashboard from './pages/admin/AdminDashboard.jsx'; // Add this import
import AdminNav from './components/AdminNav.jsx';

const App = () => (
  <Router>
    <AdminNav />
    <Routes>
      <Route path="/admin/dashboard" element={<AdminDashboard />} /> {/* Add this route */}
      <Route path="/manage-accommodations" element={<ManageAccommodations />} />
      <Route path="/manage-rooms" element={<ManageRooms />} />
    </Routes>
  </Router>
);

export default App;
