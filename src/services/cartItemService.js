import React, { useEffect, useState } from 'react';
import cartItemService from '../services/cartItemService';
import '../styles/Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const [newItem, setNewItem] = useState({}); // Dữ liệu để thêm item mới

  // Lấy tất cả các mục trong giỏ hàng
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const items = await cartItemService.getAllCartItems();
        setCartItems(items);
      } catch (err) {
        setError('Failed to fetch cart items');
      }
    };

    fetchCartItems();
  }, []);

  // Thêm mục mới vào giỏ hàng
  const handleAddItem = async () => {
    try {
      await cartItemService.addCartItems([newItem]); // Gửi danh sách các mục
      const items = await cartItemService.getAllCartItems();
      setCartItems(items); // Cập nhật danh sách giỏ hàng sau khi thêm
      setNewItem({}); // Reset trường nhập
    } catch (err) {
      setError('Failed to add item');
    }
  };

  // Xóa một mục khỏi giỏ hàng
  const handleRemoveItem = async (id) => {
    try {
      await cartItemService.removeCartItem(id);
      setCartItems(cartItems.filter((item) => item.id !== id));
    } catch (err) {
      setError('Failed to remove item');
    }
  };

  // Xử lý sự thay đổi trong trường nhập liệu
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="cart-container">
      <h2 className="cart-header">Shopping Cart</h2>

      <ul className="cart-list">
        {cartItems.map((item) => (
          <li key={item.id} className="cart-item">
            <span>{item.name} - {item.price} VND</span>
            <button className="remove-button" onClick={() => handleRemoveItem(item.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      {cartItems.length === 0 && <p className="empty-cart-message">Your cart is empty.</p>}

      <div className="add-item-form">
        <h3>Add New Item</h3>
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={newItem.name || ''}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Item Price"
          value={newItem.price || ''}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={handleAddItem}>Add Item</button>
      </div>
    </div>
  );
};

export default Cart;
