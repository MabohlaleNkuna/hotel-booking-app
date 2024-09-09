import React from 'react';
import { Link } from 'react-router-dom';

const navStyles = {
  backgroundColor: '#004AAD',
  padding: '10px',
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: 1000,
};

const ulStyles = {
  listStyleType: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  justifyContent: 'center',
};

const liStyles = {
  margin: '0 15px',
};

const linkStyles = {
  textDecoration: 'none',
  color: '#FFFFFF',
  fontSize: '16px',
};

const linkHoverStyles = {
  textDecoration: 'underline',
};

const Navigation = () => {
  return (
    <nav style={navStyles}>
      <ul style={ulStyles}>
        <li style={liStyles}>
          <Link to="/" style={linkStyles} onMouseOver={(e) => e.target.style.textDecoration = linkHoverStyles.textDecoration} onMouseOut={(e) => e.target.style.textDecoration = 'none'}>
            Home
          </Link>
        </li>
        <li style={liStyles}>
          <Link to="/register" style={linkStyles} onMouseOver={(e) => e.target.style.textDecoration = linkHoverStyles.textDecoration} onMouseOut={(e) => e.target.style.textDecoration = 'none'}>
            Register
          </Link>
        </li>
        <li style={liStyles}>
          <Link to="/login" style={linkStyles} onMouseOver={(e) => e.target.style.textDecoration = linkHoverStyles.textDecoration} onMouseOut={(e) => e.target.style.textDecoration = 'none'}>
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
