import React from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';
import '../styles/Navbar.css';

const Navbar = () => {
  const currentUser = authService.getCurrentUser();

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li><Link to="/">Home</Link></li>
        {!currentUser && (
          <>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        )}
        {currentUser && (
          <>
            <li><Link to="/profile">Profile</Link></li>
            <li><button onClick={() => { authService.logout(); window.location.reload(); }}>Logout</button></li>
          </>
        )}
        <li><Link to="/cart">Cart</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;