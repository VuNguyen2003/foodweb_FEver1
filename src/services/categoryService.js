const API_URL = 'http://localhost:8081/api/v1/categories';

const getAllCategories = async () => {
  const response = await fetch(`${API_URL}`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return await response.json();
};

const getCategoryById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch category');
  }
  return await response.json();
};

const createCategory = async (category) => {
  const response = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(category),
  });
  if (!response.ok) {
    throw new Error('Failed to create category');
  }
  return await response.json();
};

const updateCategory = async (id, category) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(category),
  });
  if (!response.ok) {
    throw new Error('Failed to update category');
  }
  return await response.json();
};

const deleteCategory = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete category');
  }
};

const categoryService = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};

export default categoryService;
