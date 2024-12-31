import React from 'react';
import '../styles/cart.css'; // Import tệp CSS

const Cart = ({ cartItems, onRemoveFromCart }) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="cart-container">
      <h2 className="cart-header">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul className="cart-list">
          {cartItems.map((item, index) => (
            <li key={index}>
              <span>{item.name} - ${item.price}</span>
              <button onClick={() => onRemoveFromCart(index)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <p className="cart-total">Total Price: ${totalPrice.toFixed(2)}</p>
    </div>
  );
};

export default Cart;
