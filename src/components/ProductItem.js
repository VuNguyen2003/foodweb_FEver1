// src/components/ProductItem.js
import React from 'react';

const ProductItem = ({ product, onAddToCart }) => (
  <div>
    <h3>{product.name}</h3>
    <p>Price: ${product.price}</p>
    <button onClick={() => onAddToCart(product)}>Add to Cart</button>
  </div>
);

export default ProductItem;
