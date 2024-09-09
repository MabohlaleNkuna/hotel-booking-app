
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Bohlale Hotel</h1>
      <p>Welcome to Bohlale Hotel. Please register or log in to continue.</p>
      <div>
        <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default HomePage;
