// src/components/Cart.js
import React from 'react';

const Cart = ({ cartItems, onRemoveFromCart }) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price}
              <button onClick={() => onRemoveFromCart(index)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <p>Total Price: ${totalPrice}</p>
    </div>
  );
};

export default Cart;
