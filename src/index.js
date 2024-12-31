// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/globals.css'; // Đảm bảo đường dẫn chính xác
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Không tìm thấy phần tử gốc để render ứng dụng.');
}
