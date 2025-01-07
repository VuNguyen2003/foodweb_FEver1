// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import ProductList from './components/ProductList';
import ProductView from './components/ProductView';
import Profile from './components/Profile';
import Cart from './components/Cart';
import './styles/App.css';
import CategoryManagement from './components/CategoryManagement';
import ProductManage from './components/ProductManage';
import OrderHistory from './components/OrderHistory';

const App = () => {
  // Quản lý giỏ hàng tại App.js
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Cập nhật localStorage mỗi khi cartItems thay đổi
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Hàm thêm sản phẩm vào giỏ hàng
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.productId === product.productId);
      if (existingItem) {
        // Tăng số lượng nếu sản phẩm đã tồn tại trong giỏ
        return prevItems.map(item =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
            : item
        );
      } else {
        // Thêm sản phẩm mới vào giỏ
        return [...prevItems, { ...product, quantity: 1, total: product.price }];
      }
    });
  };

  // Hàm loại bỏ sản phẩm khỏi giỏ hàng
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.productId !== productId));
  };

  // Hàm xóa toàn bộ giỏ hàng
  const clearCart = () => {
    setCartItems([]);
  };

  // Hàm cập nhật số lượng sản phẩm trong giỏ hàng
  const updateQuantity = (productId, quantity) => {
    setCartItems((prevItems) => {
      if (quantity < 1) {
        // Nếu số lượng nhỏ hơn 1, loại bỏ sản phẩm khỏi giỏ hàng
        return prevItems.filter(item => item.productId !== productId);
      }
      return prevItems.map(item =>
        item.productId === productId
          ? { ...item, quantity: quantity, total: item.price * quantity }
          : item
      );
    });
  };

  return (
    <Router>
      <Navbar cartItemCount={cartItems.length} /> {/* Hiển thị số lượng sản phẩm trong giỏ */}
      <Routes>
        <Route path="/" element={<ProductList addToCart={addToCart} />} />
        <Route path="/product-manage" element={<ProductManage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/categories" element={<CategoryManagement />} />
        <Route path="/products/:productId" element={<ProductView addToCart={addToCart} />} />
        <Route path="/cart" element={
          <Cart 
            cartItems={cartItems} 
            removeFromCart={removeFromCart} 
            clearCart={clearCart} 
            updateQuantity={updateQuantity} 
          />} 
        />
        <Route path="/order-history" element={<OrderHistory />} />
      </Routes>
    </Router>
  );
};

export default App;
