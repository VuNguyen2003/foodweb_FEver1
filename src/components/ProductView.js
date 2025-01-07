// src/components/ProductView.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import productService from '../services/productService';
import authService from '../services/authService'; // Import authService
import '../styles/ProductView.css';

const ProductView = ({ addToCart }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const currentUser = authService.getCurrentUser(); // Lấy thông tin người dùng hiện tại
  const userIsAdmin = authService.isAdmin(); // Kiểm tra xem người dùng có phải là admin không

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getProductById(productId);
        setProduct(data);
      } catch (err) {
        setError('Lỗi khi tải chi tiết sản phẩm');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setMessage("Sản phẩm đã được thêm vào giỏ hàng!");
    }
  };

  if (loading) return <p>Đang tải sản phẩm...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="product-view">
      <img src={product.productImageUrl} alt={product.productName} className="product-view-image" />
      <div className="product-view-details">
        <h1>{product.productName}</h1>
        <p>{product.productDescription}</p>
        <p>Giá: {product.price} VND</p>
        
        {/* Điều kiện hiển thị nút "Thêm vào giỏ hàng" */}
        {currentUser && !userIsAdmin && (
          <button onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
        )}
        
        {message && <p className="success-message">{message}</p>}
      </div>
    </div>
  );
};

export default ProductView;
