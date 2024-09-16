import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const navStyles = {
  backgroundColor: '#004AAD',
  padding: '20px',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '200px',
  height: '100%',
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
  backgroundColor: '#003B7A',
};

const linkActiveStyles = {
  backgroundColor: '#002F6C',
};

const Navigation = () => {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  const isAdmin = user?.role === 'admin';
  const isUser = user?.role === 'user';

  return (
    <nav style={navStyles}>
      <ul style={ulStyles}>
        <li style={liStyles}>
          <Link
            to="/"
            style={{ ...linkStyles, ...(location.pathname === '/' ? linkActiveStyles : {}) }}
            onMouseOver={(e) => (e.target.style.backgroundColor = linkHoverStyles.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
          >
            Home
          </Link>
        </li>
        {isUser && (
          <>
            <li style={liStyles}>
              <Link
                to="/search-results"
                style={{ ...linkStyles, ...(location.pathname === '/search-results' ? linkActiveStyles : {}) }}
                onMouseOver={(e) => (e.target.style.backgroundColor = linkHoverStyles.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
              >
                Search Results
              </Link>
            </li>
            <li style={liStyles}>
              <Link
                to="/reviews"
                style={{ ...linkStyles, ...(location.pathname === '/reviews' ? linkActiveStyles : {}) }}
                onMouseOver={(e) => (e.target.style.backgroundColor = linkHoverStyles.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
              >
                Reviews
              </Link>
            </li>
            <li style={liStyles}>
              <Link
                to="/booking-history"
                style={{ ...linkStyles, ...(location.pathname === '/booking-history' ? linkActiveStyles : {}) }}
                onMouseOver={(e) => (e.target.style.backgroundColor = linkHoverStyles.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
              >
                Booking History
              </Link>
            </li>
            <li style={liStyles}>
              <Link
                to="/profile"
                style={{ ...linkStyles, ...(location.pathname === '/profile' ? linkActiveStyles : {}) }}
                onMouseOver={(e) => (e.target.style.backgroundColor = linkHoverStyles.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
              >
                Profile
              </Link>
            </li>
          </>
        )}
        {isAdmin && (
          <>
            <li style={liStyles}>
              <Link
                to="/admin"
                style={{ ...linkStyles, ...(location.pathname === '/admin' ? linkActiveStyles : {}) }}
                onMouseOver={(e) => (e.target.style.backgroundColor = linkHoverStyles.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
              >
                Admin Dashboard
              </Link>
            </li>
            <li style={liStyles}>
              <Link
                to="/admin/manage-accommodations"
                style={{ ...linkStyles, ...(location.pathname === '/admin/manage-accommodations' ? linkActiveStyles : {}) }}
                onMouseOver={(e) => (e.target.style.backgroundColor = linkHoverStyles.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
              >
                Manage Accommodations
              </Link>
            </li>
            <li style={liStyles}>
              <Link
                to="/admin/manage-bookings"
                style={{ ...linkStyles, ...(location.pathname === '/admin/manage-bookings' ? linkActiveStyles : {}) }}
                onMouseOver={(e) => (e.target.style.backgroundColor = linkHoverStyles.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
              >
                Manage Bookings
              </Link>
            </li>
            <li style={liStyles}>
              <Link
                to="/admin/manage-rooms"
                style={{ ...linkStyles, ...(location.pathname === '/admin/manage-rooms' ? linkActiveStyles : {}) }}
                onMouseOver={(e) => (e.target.style.backgroundColor = linkHoverStyles.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
              >
                Manage Rooms
              </Link>
            </li>
          </>
        )}
        <li style={liStyles}>
          <Link
            to="/register"
            style={{ ...linkStyles, ...(location.pathname === '/register' ? linkActiveStyles : {}) }}
            onMouseOver={(e) => (e.target.style.backgroundColor = linkHoverStyles.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
          >
            Register
          </Link>
        </li>
        <li style={liStyles}>
          <Link
            to="/login"
            style={{ ...linkStyles, ...(location.pathname === '/login' ? linkActiveStyles : {}) }}
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
