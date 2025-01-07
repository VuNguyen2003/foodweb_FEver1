// src/services/ordersService.js

const API_URL = 'http://localhost:8081/api/v1/orders';

/**
 * Encodes credentials for Basic Authentication.
 * @param {string} username 
 * @param {string} password 
 * @returns {string} Base64 encoded credentials.
 */
const encodeCredentials = (username, password) => {
  return btoa(`${username}:${password}`);
};

/**
 * Creates a new order along with its details.
 * @param {Object} order - The order data.
 * @param {string} username - User's username.
 * @param {string} password - User's password.
 * @returns {Promise<Object>} - The created order response.
 */
const createOrder = async (order, username, password) => {
  const credentials = encodeCredentials(username, password);

  const response = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Basic ${credentials}`,
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    let errorMessage = 'Không thể tạo đơn hàng';
    try {
      const errorData = await response.json();
      if (errorData.message) {
        errorMessage = errorData.message;
      }
    } catch (e) {
      // Retain default error message if parsing fails
    }
    throw new Error(errorMessage);
  }

  const data = await response.json();
  return data;
};

/**
 * Retrieves order history for a user.
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise<Array>} - List of orders.
 */
const getOrderHistory = async (username, password) => {
  const credentials = encodeCredentials(username, password);

  const response = await fetch(`${API_URL}/history`, {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Basic ${credentials}`,
    },
  });

  if (!response.ok) {
    let errorMessage = 'Không thể tải lịch sử đơn hàng';
    try {
      const errorData = await response.json();
      if (errorData.message) {
        errorMessage = errorData.message;
      }
    } catch (e) {
      // Retain default error message if parsing fails
    }
    throw new Error(errorMessage);
  }

  const data = await response.json();
  return data;
};

// Exporting the service functions
const ordersService = {
  createOrder,
  getOrderHistory,
};

export default ordersService;
