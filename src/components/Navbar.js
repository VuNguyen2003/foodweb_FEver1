import React from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';
import '../styles/Navbar.css';

const Navbar = () => {
  const currentUser = authService.getCurrentUser();
  const userIsAdmin = authService.isAdmin();  // Sử dụng hàm isAdmin() đã định nghĩa

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li><Link to="/">Home</Link></li>

        {/* Nếu chưa đăng nhập, hiển thị Register + Login */}
        {!currentUser && (
          <>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        )}

        {/* Nếu đã đăng nhập, hiển thị Profile + Logout */}
        {currentUser && (
          <>
            <li><Link to="/profile">Profile</Link></li>
            <li>
              <button
                onClick={() => {
                  authService.logout();
                  window.location.reload();
                }}
              >
                Logout
              </button>
            </li>
          </>
        )}

        {/* 
          Nếu là admin (userIsAdmin === true) thì hiển thị link "Product Manage".
          Nếu không phải admin nhưng vẫn đăng nhập, hiển thị link "Cart".
        */}
        {currentUser && userIsAdmin ? (
          <li><Link to="/product-manage">Product Manage</Link></li>
        ) : (
          currentUser && <li><Link to="/cart">Cart</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
