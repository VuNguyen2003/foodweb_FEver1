// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';
import '../styles/Navbar.css'; // Assuming custom styles are added in this file

const Navbar = () => {
  const currentUser = authService.getCurrentUser();
  const isAdmin = authService.isAdmin();

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
            {isAdmin && <li><Link to="/add-product">Add Product</Link></li>}
            {!isAdmin && <li><Link to="/cart">Cart</Link></li>}
            <li><Link to="/profile">Profile</Link></li>
            <li><button onClick={() => { authService.logout(); window.location.reload(); }}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
