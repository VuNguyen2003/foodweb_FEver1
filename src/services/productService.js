// src/services/productService.js
const API_URL = 'http://localhost:8081/api/v1/products';

const getAllProducts = async () => {
  const response = await fetch(API_URL);
  if (response.ok) {
    const data = await response.json();
    return data.content || data; // Điều chỉnh theo cấu trúc dữ liệu trả về từ API
  } else {
    throw new Error('Failed to fetch products');
  }
};

const getProductById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return await response.json();
};

const productService = {
  getAllProducts,
  getProductById,
};

export default productService;
