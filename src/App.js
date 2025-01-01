import React, { useState } from 'react';
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

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const handleRemoveFromCart = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList onAddToCart={handleAddToCart} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/categories" element={<CategoryManagement />} />
        <Route path="/products/:productId" element={<ProductView onAddToCart={handleAddToCart} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />} />
      </Routes>
    </Router>
  );
};

export default App;