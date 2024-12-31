import React, { useState, useEffect } from 'react';
import productService from '../services/productService';

const ProductList = () => {
  const [products, setProducts] = useState([]); // Khởi tạo với mảng rỗng
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div>
      {products.map((product) => (
        <div key={product.productId}>
          <h2>{product.productName}</h2>
          <p>{product.productDescription}</p>
          <p>Giá: {product.price} VND</p>
          {/* Hiển thị thêm thông tin sản phẩm nếu cần */}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
