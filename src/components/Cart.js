// src/components/Cart.js
import React, { useState } from 'react';
import '../styles/Cart.css';

const Cart = ({ cartItems, removeFromCart, clearCart, updateQuantity }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      setError("Giỏ hàng trống!");
      return;
    }
    setShowPaymentMethod(true);
    setError("");
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleConfirmPayment = () => {
    if (!paymentMethod) {
      setError("Vui lòng chọn phương thức thanh toán.");
      return;
    }

    // Tạo hóa đơn (invoice)
    const invoice = {
      orderId: Date.now(),
      items: cartItems,
      total: cartItems.reduce((acc, item) => acc + item.total, 0),
      date: new Date().toLocaleString(),
      paymentMethod: paymentMethod,
    };

    // Hiển thị hóa đơn đơn giản dưới dạng JSON
    alert(`Hóa Đơn:\n${JSON.stringify(invoice, null, 2)}`);

    // Xóa giỏ hàng sau khi thanh toán thành công
    clearCart();
    setMessage("Thanh toán thành công! Hóa đơn đã được tạo.");
    setShowPaymentMethod(false);
    setPaymentMethod("");
  };

  const handleCancelPayment = () => {
    setShowPaymentMethod(false);
    setPaymentMethod("");
  };

  const handleIncreaseQuantity = (productId) => {
    const item = cartItems.find(item => item.productId === productId);
    if (item) {
      updateQuantity(productId, item.quantity + 1);
    }
  };

  const handleDecreaseQuantity = (productId) => {
    const item = cartItems.find(item => item.productId === productId);
    if (item && item.quantity > 1) {
      updateQuantity(productId, item.quantity - 1);
    } else {
      // Nếu số lượng <=1, loại bỏ sản phẩm khỏi giỏ hàng
      removeFromCart(productId);
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const quantity = parseInt(newQuantity, 10);
    if (!isNaN(quantity)) {
      updateQuantity(productId, quantity);
    }
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
            {cartItems.map((item) => (
              <li key={item.productId} className="cart-item">
                <div className="item-details">
                  <span className="item-name">{item.productName}</span>
                  <span className="item-price">Giá: {item.price} VND</span>
                </div>
                <div className="quantity-controls">
                  <button onClick={() => handleDecreaseQuantity(item.productId)}>-</button>
                  <input 
                    type="number" 
                    value={item.quantity} 
                    min="1"
                    onChange={(e) => handleQuantityChange(item.productId, e.target.value)} 
                  />
                  <button onClick={() => handleIncreaseQuantity(item.productId)}>+</button>
                </div>
                <span className="item-total">Tổng: {item.total} VND</span>
                <button className="remove-button" onClick={() => removeFromCart(item.productId)}>Xóa</button>
              </li>
            ))}
          </ul>
          <h3>Tổng Cộng: {cartItems.reduce((acc, item) => acc + item.total, 0)} VND</h3>
          {!showPaymentMethod && (
            <button className="checkout-button" onClick={handleCheckout}>
              Thanh Toán
            </button>
          )}

          {showPaymentMethod && (
            <div className="payment-modal">
              <div className="payment-content">
                <h3>Chọn Phương Thức Thanh Toán</h3>
                <form>
                  <label>
                    <input
                      type="radio"
                      value="Credit Card"
                      checked={paymentMethod === "Credit Card"}
                      onChange={handlePaymentMethodChange}
                    />
                    Thẻ Tín Dụng
                  </label>
                  <br />
                  <label>
                    <input
                      type="radio"
                      value="PayPal"
                      checked={paymentMethod === "PayPal"}
                      onChange={handlePaymentMethodChange}
                    />
                    PayPal
                  </label>
                  <br />
                  <label>
                    <input
                      type="radio"
                      value="Cash on Delivery"
                      checked={paymentMethod === "Cash on Delivery"}
                      onChange={handlePaymentMethodChange}
                    />
                    Thanh Toán Khi Nhận Hàng
                  </label>
                </form>
                {error && <p className="error-message">{error}</p>}
                <div className="payment-buttons">
                  <button onClick={handleConfirmPayment}>Xác Nhận</button>
                  <button onClick={handleCancelPayment}>Hủy</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
