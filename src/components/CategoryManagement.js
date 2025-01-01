import React, { useEffect, useState } from 'react';
import categoryService from '../services/categoryService';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await categoryService.getAllCategories();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const handleCreateCategory = async () => {
    const created = await categoryService.createCategory(newCategory);
    setCategories([...categories, created]);
  };

  const handleDeleteCategory = async (id) => {
    await categoryService.deleteCategory(id);
    setCategories(categories.filter((category) => category.id !== id));
  };

  return (
    <div>
      <h2>Category Management</h2>
      <input
        type="text"
        placeholder="Name"
        value={newCategory.name}
        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newCategory.description}
        onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
      />
      <button onClick={handleCreateCategory}>Create Category</button>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.name} - {category.description}
            <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManagement;
