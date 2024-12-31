// src/components/Login.js
import React, { useState } from 'react';
import authService from '../services/authService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await authService.login({ username, password });
      alert('Login successful');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
