// src/services/authService.js

const API_URL = 'http://localhost:8081/api/v1/account';

/**
 * Gửi yêu cầu đăng ký tài khoản (register) lên server.
 * @param {Object} user - Thông tin tài khoản (username, password, ...)
 */
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

/**
 * Gửi yêu cầu đăng nhập (login) lên server và lưu thông tin trả về (bao gồm role) vào localStorage.
 * @param {Object} user - Thông tin đăng nhập (username, password).
 */
const login = async (user) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (response.ok) {
    /**
     * Nếu Backend trả về JSON dạng:
     * {
     *   "message": "Đăng nhập thành công!",
     *   "username": "someUser",
     *   "role": "ADMIN"
     * }
     */
    const data = await response.json();
    // Lưu toàn bộ đối tượng data vào localStorage
    localStorage.setItem('user', JSON.stringify(data));
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }
};

/**
 * Đăng xuất: Xoá user khỏi localStorage, điều hướng về trang chủ.
 */
const logout = () => {
  localStorage.removeItem('user');
  window.location.href = '/'; // Redirect về home page sau khi logout
};

/**
 * Lấy thông tin user hiện tại từ localStorage.
 * @returns {Object|null} Trả về object user nếu tồn tại, ngược lại null.
 */
const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

/**
 * Kiểm tra user hiện tại có role là "ADMIN" hay không.
 * @returns {boolean} true nếu user.role === "ADMIN", ngược lại false.
 */
const isAdmin = () => {
  const user = getCurrentUser();
  // Nếu Backend trả về "role": "ADMIN", ta so sánh trực tiếp
  return user?.role === 'ADMIN';
};

/**
 * Lấy thông tin chi tiết của tài khoản (profile) từ backend qua username.
 * @param {string} username 
 * @returns {Object} Thông tin profile trả về từ API.
 */
const getProfile = async (username) => {
  const response = await fetch(`${API_URL}/${username}`);
  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }
  return await response.json();
};

const updateProfile = async (username, updatedProfile) => {
  const response = await fetch(`${API_URL}/${username}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProfile),
  });
  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Update failed');
  }
};


/**
 * Xuất tất cả hàm tiện ích dưới dạng object.
 */
const authService = {
  updateProfile,
  register,
  login,
  logout,
  getCurrentUser,
  isAdmin,
  getProfile,
};

export default authService;
