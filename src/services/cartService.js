/**
 * Cart Service
 * 
 * This service handles all cart-related operations.
 * It uses localStorage to persist cart data between sessions.
 */

// Local storage key for cart
const CART_STORAGE_KEY = 'bahrain_delivery_cart';

/**
 * Get the current cart
 * @returns {Array} - Array of cart items
 */
export const getCart = () => {
  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error('Error getting cart from localStorage:', error);
    return [];
  }
};

/**
 * Add an item to the cart
 * @param {Object} item - Item to add to cart
 * @returns {Array} - Updated cart
 */
export const addToCart = (item) => {
  try {
    const cart = getCart();
    
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(
      i => i.productId === item.productId && i.sizeId === item.sizeId
    );
    
    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      cart[existingItemIndex].quantity += item.quantity;
    } else {
      // Add new item
      cart.push(item);
    }
    
    // Save to localStorage
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    
    return cart;
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return getCart();
  }
};

/**
 * Update an item in the cart
 * @param {number} index - Index of the item to update
 * @param {Object} updates - Properties to update
 * @returns {Array} - Updated cart
 */
export const updateCartItem = (index, updates) => {
  try {
    const cart = getCart();
    
    if (index >= 0 && index < cart.length) {
      cart[index] = { ...cart[index], ...updates };
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
    
    return cart;
  } catch (error) {
    console.error('Error updating cart item:', error);
    return getCart();
  }
};

/**
 * Remove an item from the cart
 * @param {number} index - Index of the item to remove
 * @returns {Array} - Updated cart
 */
export const removeCartItem = (index) => {
  try {
    const cart = getCart();
    
    if (index >= 0 && index < cart.length) {
      cart.splice(index, 1);
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
    
    return cart;
  } catch (error) {
    console.error('Error removing cart item:', error);
    return getCart();
  }
};

/**
 * Clear the cart
 * @returns {Array} - Empty cart
 */
export const clearCart = () => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([]));
    return [];
  } catch (error) {
    console.error('Error clearing cart:', error);
    return getCart();
  }
};

/**
 * Get the total number of items in the cart
 * @returns {number} - Total number of items
 */
export const getCartItemCount = () => {
  try {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  } catch (error) {
    console.error('Error calculating cart item count:', error);
    return 0;
  }
};

/**
 * Get the total price of items in the cart
 * @returns {number} - Total price
 */
export const getCartTotal = () => {
  try {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  } catch (error) {
    console.error('Error calculating cart total:', error);
    return 0;
  }
};

export default {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  getCartItemCount,
  getCartTotal
};
