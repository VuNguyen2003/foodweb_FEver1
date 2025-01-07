// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import authService from '../services/authService';
import '../styles/Navbar.css';

const Navbar = () => {
  const currentUser = authService.getCurrentUser();
  const userIsAdmin = authService.isAdmin();  // Sử dụng hàm isAdmin() đã định nghĩa
  const navigate = useNavigate(); // Khởi tạo navigate

  // Hàm xử lý Logout
  const handleLogout = () => {
    authService.logout();      // Thực hiện Logout (xóa token, session, v.v.)
    navigate('/login');        // Chuyển hướng đến trang Login
  };

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
              <button onClick={handleLogout}>
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
