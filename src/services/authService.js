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
    throw new Error('Registration failed');
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
    localStorage.setItem('user', JSON.stringify(data));
  } else {
    throw new Error('Login failed');
  }
};

const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
