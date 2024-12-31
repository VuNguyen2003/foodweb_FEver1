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
  window.location.href = '/login'; // Redirect to login page after logout
};

const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default authService;
