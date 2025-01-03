const API_URL = 'http://localhost:8081/api/v1/cartitem';

const addCartItem = async (cartItem) => {
  const response = await fetch(`${API_URL}/additems`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cartItem),
  });

  if (!response.ok) {
    throw new Error('Failed to add cart item');
  }
};

const cartItemService = {
  addCartItem,
  // Các hàm khác
};

export default cartItemService;
