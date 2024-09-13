import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import ManageAccommodations from './pages/admin/ManageAccommodations.jsx';
import ManageRooms from './pages/admin/ManageRoom.js';
import ManageBookings from './pages/admin/ManageBookings.jsx';
import ManageUsers from './pages/admin/ManageUsers.jsx';
import ManageReviews from './pages/admin/ManageReviews.js';
import AdminNav from './components/AdminNav.jsx';

const Registration = () => (
  <div>
    <h2>Registration</h2>
    <form>
      <label>Name:
        <input type="text" name="name" />
      </label>
      <label>Email:
        <input type="email" name="email" />
      </label>
      <label>Password:
        <input type="password" name="password" />
      </label>
      <label>Phone Number:
        <input type="tel" name="phone" />
      </label>
      <button type="submit">Register</button>
    </form>
  </div>
);

const Login = () => (
  <div>
    <h2>Login</h2>
    <form>
      <label>Email:
        <input type="email" name="email" />
      </label>
      <label>Password:
        <input type="password" name="password" />
      </label>
      <button type="submit">Login</button>
    </form>
  </div>
);

const App = () => (
  <Router>
    <AdminNav />
    <Routes>
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/manage-accommodations" element={<ManageAccommodations />} />
      <Route path="/manage-rooms" element={<ManageRooms />} />
      <Route path="/manage-bookings" element={<ManageBookings />} />
      <Route path="/manage-users" element={<ManageUsers />} />
      <Route path="/manage-reviews" element={<ManageReviews />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </Router>
);

export default App;
