import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #333;
  padding: 1rem;
`;

const StyledLink = styled(NavLink)`
  color: white;
  margin-right: 1rem;
  text-decoration: none;

  &.active {
    font-weight: bold;
    border-bottom: 2px solid #fff;
  }
`;

const AdminNav = () => (
  <Nav>
    <StyledLink to="/manage-accommodations">Manage Accommodations</StyledLink>
    <StyledLink to="/manage-rooms">Manage Rooms</StyledLink>
  </Nav>
);

export default AdminNav;
