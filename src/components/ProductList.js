// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import productService from '../services/productService';
import { Link } from 'react-router-dom';
import '../styles/ProductList.css';

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts();
        setProducts(data);
      } catch (err) {
        setError('Lỗi khi tải danh sách sản phẩm');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  if (loading) return <p>Đang tải sản phẩm...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.productId} className="product-card">
          <Link to={`/products/${product.productId}`}>
            <img src={product.productImageUrl} alt={product.productName} className="product-image" />
          </Link>
          <h3>{product.productName}</h3>
          <p>Giá: {product.price} VND</p>
          <button onClick={() => handleAddToCart(product)}>Thêm vào giỏ hàng</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
