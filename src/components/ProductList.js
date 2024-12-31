// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import productService from '../services/productService';
import '../styles/product.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts();
        setProducts(data);
      } catch (error) {
        setError('Lỗi khi tải sản phẩm');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Đang tải sản phẩm...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <div
          className="product-item"
          key={product.productId}
          onClick={() => navigate(`/products/${product.productId}`)}
        >
          <h2 className="product-title">{product.productName}</h2>
          <p className="product-description">{product.productDescription}</p>
          <p className="product-price">Giá: {product.price} VND</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;