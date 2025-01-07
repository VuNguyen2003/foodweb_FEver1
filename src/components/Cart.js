// src/components/Cart.js
import React, { useState } from 'react';
import '../styles/Cart.css';

const Cart = ({ cartItems, removeFromCart, clearCart }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      setError("Giỏ hàng trống!");
      return;
    }

    // Tạo hóa đơn (invoice)
    const invoice = {
      orderId: Date.now(),
      items: cartItems,
      total: cartItems.reduce((acc, item) => acc + item.total, 0),
      date: new Date().toLocaleString(),
    };

    // Giả sử bạn muốn hiển thị hóa đơn đơn giản dưới dạng JSON
    alert(`Hóa Đơn:\n${JSON.stringify(invoice, null, 2)}`);

    // Xóa giỏ hàng sau khi thanh toán
    clearCart();
    setMessage("Thanh toán thành công! Hóa đơn đã được tạo.");
    setError("");
  };

  return (
    <div className="cart-container">
      <h2>Giỏ Hàng</h2>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      {cartItems.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống.</p>
      ) : (
        <div>
          <ul className="cart-list">
            {cartItems.map(item => (
              <li key={item.productId} className="cart-item">
                <span>{item.productName} - {item.price} VND x {item.quantity} = {item.total} VND</span>
                <button onClick={() => removeFromCart(item.productId)}>Xóa</button>
              </li>
            ))}
          </ul>
          <h3>Tổng Cộng: {cartItems.reduce((acc, item) => acc + item.total, 0)} VND</h3>
          <button onClick={handleCheckout}>Thanh Toán</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
