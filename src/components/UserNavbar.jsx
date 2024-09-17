import React from 'react';
import { Link } from 'react-router-dom';

const UserNavbar = () => {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li><Link to="/user-homepage" style={styles.navLink}>Home</Link></li>
        <li><Link to="/room-details" style={styles.navLink}>Room Details</Link></li>
        <li><Link to="/logout" style={styles.navLink}>Logout</Link></li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#004aad',
    color: '#ffffff',
    padding: '10px',
    borderBottom: '2px solid #003a8c',
  },
  navList: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
    display: 'flex',
    justifyContent: 'center',
  },
  navLink: {
    color: '#ffffff',
    textDecoration: 'none',
    padding: '10px 20px',
    display: 'block',
  },
};

export default UserNavbar;
