import React from 'react';
import { Link } from 'react-router-dom';

const navStyles = {
  backgroundColor: '#004AAD',
  padding: '20px',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '200px', // Width of the sidebar
  height: '100%', // Full height
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const ulStyles = {
  listStyleType: 'none',
  margin: 0,
  padding: 0,
};

const liStyles = {
  margin: '10px 0',
};

const linkStyles = {
  textDecoration: 'none',
  color: '#FFFFFF',
  fontSize: '16px',
  display: 'block',
  padding: '10px',
  borderRadius: '4px',
  transition: 'background-color 0.3s ease',
};

const linkHoverStyles = {
  backgroundColor: '#003B7A', // Darker shade on hover
};

const Navigation = () => {
  return (
    <nav style={navStyles}>
      <ul style={ulStyles}>
        <li style={liStyles}>
          <Link
            to="/"
            style={linkStyles}
            onMouseOver={(e) => (e.target.style.backgroundColor = linkHoverStyles.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
          >
            Home
          </Link>
        </li>
        <li style={liStyles}>
          <Link
            to="/accommodation-details"
            style={linkStyles}
            onMouseOver={(e) => (e.target.style.backgroundColor = linkHoverStyles.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
          >
            Accommodation Details
          </Link>
        </li>
        <li style={liStyles}>
          <Link
            to="/booking-confirmation"
            style={linkStyles}
            onMouseOver={(e) => (e.target.style.backgroundColor = linkHoverStyles.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
          >
            Booking Confirmation
          </Link>
        </li>
        <li style={liStyles}>
          <Link
            to="/search-results"
            style={linkStyles}
            onMouseOver={(e) => (e.target.style.backgroundColor = linkHoverStyles.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
          >
            Search Results
          </Link>
        </li>
        <li style={liStyles}>
          <Link
            to="/reviews"
            style={linkStyles}
            onMouseOver={(e) => (e.target.style.backgroundColor = linkHoverStyles.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
          >
            Reviews
          </Link>
        </li>
        <li style={liStyles}>
          <Link
            to="/booking-history"
            style={linkStyles}
            onMouseOver={(e) => (e.target.style.backgroundColor = linkHoverStyles.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
          >
            Booking History
          </Link>
        </li>
        <li style={liStyles}>
          <Link
            to="/profile"
            style={linkStyles}
            onMouseOver={(e) => (e.target.style.backgroundColor = linkHoverStyles.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
          >
            Profile
          </Link>
        </li>
        <li style={liStyles}>
          <Link
            to="/register"
            style={linkStyles}
            onMouseOver={(e) => (e.target.style.backgroundColor = linkHoverStyles.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
          >
            Register
          </Link>
        </li>
        <li style={liStyles}>
          <Link
            to="/login"
            style={linkStyles}
            onMouseOver={(e) => (e.target.style.backgroundColor = linkHoverStyles.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
          >
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
