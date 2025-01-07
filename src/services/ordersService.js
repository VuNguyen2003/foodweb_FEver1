// src/services/ordersService.js
const API_URL = 'http://localhost:8081/api/v1/orders';
const ORDER_DETAILS_URL = 'http://localhost:8081/api/v1/order-details';

const createOrder = async (order) => {
  const response = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  });
  if (!response.ok) {
    throw new Error('Không thể tạo đơn hàng');
  }
  const data = await response.json();
  return data;
};

const createOrderDetails = async (orderDetails) => {
  const promises = orderDetails.map(detail =>
    fetch(`${ORDER_DETAILS_URL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(detail),
    }).then(response => {
      if (!response.ok) {
        throw new Error('Không thể tạo chi tiết đơn hàng');
      }
      return response.json();
    })
  );

  return Promise.all(promises);
};

// Nếu bạn đã tạo endpoint mới để gửi toàn bộ đơn hàng cùng chi tiết, hãy thêm phương thức tương ứng
/*
const createOrderWithDetails = async (orderWithDetails) => {
  const response = await fetch(`${API_URL}/create-with-details`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderWithDetails),
  });
  if (!response.ok) {
    throw new Error('Không thể tạo đơn hàng cùng chi tiết');
  }
  const data = await response.json();
  return data;
};
*/

const ordersService = {
  createOrder,
  createOrderDetails,
  // createOrderWithDetails, // Nếu bạn sử dụng phương thức này
  // Các hàm khác nếu cần
};

export default ordersService;
