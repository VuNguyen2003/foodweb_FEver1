import React, { useEffect, useState } from 'react';
import cartItemService from '../services/cartItemService';
import '../styles/Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const items = await cartItemService.getAllCartItems();
        setCartItems(items);
      } catch (err) {
        setError('Failed to fetch cart items');
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveItem = async (id) => {
    try {
      await cartItemService.removeCartItem(id);
      setCartItems(cartItems.filter((item) => item.id !== id));
    } catch (err) {
      setError('Failed to remove item');
    }
  };

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="cart-container">
      <h2 className="cart-header">Shopping Cart</h2>
      <ul className="cart-list">
        {cartItems.map((item) => (
          <li key={item.id} className="cart-item">
            <span>{item.name} - {item.price} VND</span>
            <button className="remove-button" onClick={() => handleRemoveItem(item.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      {cartItems.length === 0 && <p className="empty-cart-message">Your cart is empty.</p>}
    </div>
  );
};

export default Cart;