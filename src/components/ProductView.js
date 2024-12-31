import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import productService from '../services/productService';
import '../styles/ProductView.css';

const ProductView = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getProductById(productId);
        setProduct(data);
      } catch (error) {
        setError('Lỗi khi tải chi tiết sản phẩm');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <p>Đang tải sản phẩm...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="product-view-container">
      <div className="product-view-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-view-details">
        <h1 className="product-title">{product.name}</h1>
        <p className="product-description">{product.description}</p>
        <p className="product-price">Giá: {product.price} VND</p>
      </div>
    </div>
  );
};

export default ProductView;
