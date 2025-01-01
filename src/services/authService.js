// src/services/authService.js
const API_URL = 'http://localhost:8081/api/v1/account';

const register = async (user) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Registration failed');
  }
};

const login = async (user) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (response.ok) {
    const data = await response.json();
    localStorage.setItem('user', JSON.stringify({ ...data, username: user.username }));
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }
};

const logout = () => {
  localStorage.removeItem('user');
  window.location.href = '/'; // Redirect to home page after logout
};

const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const isAdmin = () => {
  const user = getCurrentUser();
  return user?.roles?.includes('ADMIN'); // Assuming roles are stored in user object
};

const getProfile = async (username) => {
  const response = await fetch(`${API_URL}/${username}`);
  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }
  return await response.json();
};
const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  isAdmin,
  getProfile,
};

export default authService;