
const API_URL = 'http://localhost:8081/api/v1/products';

const getAllProducts = async () => {
  const response = await fetch(API_URL);
  if (response.ok) {
    const data = await response.json();
    // Nếu backend chỉ trả về mảng products thì:
    return data; 
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

const createProduct = async (productFormData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    body: productFormData,
  });
  if (!response.ok) {
    throw new Error('Failed to create product');
  }
  return await response.json();
};


const updateProduct = async (id, productRequest) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productRequest),
  });
  if (!response.ok) {
    throw new Error('Failed to update product');
  }
  return await response.json();
};

const updateProductWithImage = async (id, productFormData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    body: productFormData,
  });
  if (!response.ok) {
    throw new Error('Failed to update product');
  }
  return await response.json(); // { message, product }
};

const deleteProduct = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete product');
  }
  return await response.json();
};

const productService = {
  updateProductWithImage,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
};

export default productService;
