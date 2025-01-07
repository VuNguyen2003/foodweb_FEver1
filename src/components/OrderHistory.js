// src/components/OrderHistory.js
import React, { useEffect, useState } from 'react';
import '../styles/OrderHistory.css';
import ordersService from '../services/ordersService'; // Import the service

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  // Replace these with actual user credentials or fetch from authentication context
  const username = 'user1'; // Example username
  const password = 'password1'; // Example password

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const data = await ordersService.getOrderHistory(username, password);
        setOrders(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchOrderHistory();
  }, [username, password]);

  return (
    <div className="order-history-container">
      <h2>Lịch Sử Đơn Hàng</h2>
      {error && <p className="error-message">{error}</p>}
      {orders.length === 0 ? (
        <p>Bạn chưa có đơn hàng nào.</p>
      ) : (
        <ul className="order-list">
          {orders.map(order => (
            <li key={order.orderId} className="order-item">
              <h3>{order.orderName}</h3>
              <p>Ngày: {new Date(order.date).toLocaleString()}</p>
              <p>Phương Thức Thanh Toán: {order.paymentMethod}</p>
              <p>Tổng Cộng: {order.total} VND</p>
              <h4>Chi Tiết Đơn Hàng:</h4>
              <ul>
                {order.orderDetails.map(detail => (
                  <li key={detail.orderDetailId}>
                    {detail.product.productName} - {detail.orderQuantity} x {detail.product.price} VND = {detail.orderTotal} VND
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
