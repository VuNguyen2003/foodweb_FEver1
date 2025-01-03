import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import productService from '../services/productService';
import cartItemService from '../services/cartItemService';
import '../styles/ProductView.css';

const ProductView = ({ cartId }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

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

  const handleAddToCart = async () => {
    try {
      const cartItem = {
        productId: product.productId,
        cartId: cartId,
        quantityItem: 1,
        totalItem: product.price,
      };
      await cartItemService.addCartItem(cartItem);
      setMessage("Sản phẩm đã được thêm vào giỏ hàng!");
    } catch (err) {
      setMessage("Không thể thêm sản phẩm vào giỏ hàng!");
    }
  };

  if (loading) {
    return <p>Đang tải sản phẩm...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="product-view-container">
      <div className="product-view-image">
        <img src={product.productImageUrl} alt={product.productName} />
      </div>
      <div className="product-view-details">
        <h1 className="product-title">{product.productName}</h1>
        <p className="product-description">{product.productDescription}</p>
        <p className="product-price">Giá: {product.price} VND</p>
        <button
          className="add-to-cart-button"
          onClick={handleAddToCart}
        >
          Thêm vào giỏ hàng
        </button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default ProductView;
