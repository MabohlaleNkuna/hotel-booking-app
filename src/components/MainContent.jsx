import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/user/UserHomepage';
import AccommodationDetails from '../pages/user/AccommodationDetails';
import BookingConfirmation from '../pages/user/BookingConfirmation';
import SearchResults from '../pages/user/SearchResults';
import Reviews from '../pages/user/Reviews';
import BookingHistory from '../pages/user/BookingHistory';
import RegisterPage from '../pages/user/RegisterPage'; 
import LoginPage from '../pages/user/UserLogin'; 
import UserProfile from '../pages/user/UserProfile';
import ProtectedRoute from './ProtectedRoute'; 

const MainContent = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/accommodation/:id" element={<AccommodationDetails />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/booking-history" element={<BookingHistory />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute isAuthenticated={!!user}>
              <UserProfile />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  );
};

export default MainContent;
