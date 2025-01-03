// src/components/ProductManage.jsx
import React, { useEffect, useState } from 'react';
import productService from '../services/productService';
import '../styles/ProductManage.css'; // Import CSS riêng cho component

const ProductManage = () => {
  const [products, setProducts] = useState([]);

  // State cho form thêm mới
  const [newProduct, setNewProduct] = useState({
    productName: '',
    price: '',
    ProductDescription: '',
    productImageUrl: null,
  });

  // State cho form edit
  const [editProduct, setEditProduct] = useState(null);

  // Lấy danh sách sản phẩm khi mount
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products:', error);
      alert('Failed to load products');
    }
  };

  // Xử lý tạo mới sản phẩm
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const productData = {
        productName: newProduct.productName,
        price: newProduct.price,
        productDescription: newProduct.productDescription,
      };
      formData.append('product', new Blob([JSON.stringify(productData)], { type: 'application/json' }));
      formData.append('productImageUrl', newProduct.image);
  
      await productService.createProduct(formData);
      alert('Product created successfully!');
      // Reset form và tải lại danh sách sản phẩm
    } catch (error) {
      console.error(error);
      alert('Failed to create product');
    }
  };

  // Xử lý xóa
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure to delete this product?')) return;
    try {
      await productService.deleteProduct(productId);
      alert('Product deleted successfully!');
      loadProducts();
    } catch (error) {
      console.error(error);
      alert('Failed to delete product');
    }
  };

  // Click "Edit" => set editProduct
  const handleEditClick = (product) => {
    setEditProduct({ ...product });
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditProduct(null);
  };

  // Xử lý cập nhật (có thể thay ảnh mới hoặc giữ ảnh cũ)
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!editProduct) return;
  
    try {
      const formData = new FormData();
      const productData = {
        productName: editProduct.productName,
        price: editProduct.price,
        productDescription: editProduct.productDescription,
      };
      formData.append('product', new Blob([JSON.stringify(productData)], { type: 'application/json' }));
  
      if (editProduct.newImageFile) {
        formData.append('productImageUrl', editProduct.newImageFile);
      }
  
      await productService.updateProductWithImage(editProduct.productId, formData);
      alert('Product updated successfully!');
      setEditProduct(null);
      loadProducts();
    } catch (error) {
      console.error(error);
      alert('Failed to update product');
    }
  };

  // Giao diện
  return (
    <div className="product-manage-container">
      <h2>Product Management</h2>

      {/* Form thêm mới */}
      <div className="card">
        <h3>Add New Product</h3>
        <form onSubmit={handleCreateProduct}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={newProduct.productName}
              onChange={(e) =>
                setNewProduct({ ...newProduct, productName: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Price:</label>
            <input
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <input
              type="text"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Image:</label>
            <input
              type="file"
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.files[0] })
              }
              required
            />
          </div>

          <button type="submit">Create Product</button>
        </form>
      </div>

      <hr />

      {/* Danh sách sản phẩm */}
      <h3>List of Products</h3>
      {products.map((product) => (
        <div className="product-item" key={product.productId}>
          <div className="product-info">
            <p>
              <strong>{product.productName}</strong> - {product.price} VND
            </p>
            <p>{product.description}</p>
            {/* Nếu backend trả về imageUrl (VD: product.imageUrl), hiển thị ảnh */}
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt="product"
                className="product-image"
              />
            )}
          </div>
          <div className="product-actions">
            <button onClick={() => handleDeleteProduct(product.productId)}>Delete</button>
            <button onClick={() => handleEditClick(product)}>Edit</button>
          </div>
        </div>
      ))}

      {/* Form edit (nếu có editProduct) */}
      {editProduct && (
        <div className="card edit-card">
          <h3>Edit Product</h3>
          <form onSubmit={handleUpdateProduct}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={editProduct.productName}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, productName: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Price:</label>
              <input
                type="number"
                value={editProduct.price}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, price: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Description:</label>
              <input
                type="text"
                value={editProduct.description}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, description: e.target.value })
                }
              />
            </div>

            {/* Ảnh cũ, nếu có */}
            {editProduct.imageUrl && (
              <div className="old-image-section">
                <p>Current Image:</p>
                <img
                  src={editProduct.imageUrl}
                  alt="current product"
                  className="product-image"
                />
              </div>
            )}

            {/* Ảnh mới */}
            <div className="form-group">
              <label>New Image (optional):</label>
              <input
                type="file"
                onChange={(e) =>
                  setEditProduct({ ...editProduct, newImageFile: e.target.files[0] })
                }
              />
            </div>

            <div className="edit-buttons">
              <button type="submit">Update</button>
              <button type="button" onClick={handleCancelEdit}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductManage;
