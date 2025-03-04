import React, { useEffect, useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import logo from '../assets/bohlales_hideaway_logo_transparent.png';
import './UserNavbar.css'; 

const UserNavbar = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/login');
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Navbar.Brand as={Link} to="/" className="brand">
        <img src={logo} alt="Logo" className="navbar-logo" /> {/* Logo */}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
          {user ? (
            <>
              <Nav.Link as={Link} to="/profile" className="nav-link">Profile</Nav.Link>
              <Nav.Link onClick={handleLogout} className="nav-link logout">Logout</Nav.Link>
            </>
          ) : (
            <Nav.Link as={Link} to="/login" className="nav-link">Login</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default UserNavbar;
