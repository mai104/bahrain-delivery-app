/**
 * useCart Hook
 * 
 * Custom hook for managing shopping cart functionality.
 */

import { useState, useEffect, useCallback } from 'react';
import * as cartService from '../services/cartService';

/**
 * Hook for managing cart state and operations
 * @returns {Object} Cart state and functions
 */
const useCart = () => {
  const [cart, setCart] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadCart = () => {
      try {
        setLoading(true);
        const cartData = cartService.getCart();
        setCart(cartData);
        setItemCount(cartService.getCartItemCount());
        setTotal(cartService.getCartTotal());
      } catch (error) {
        console.error('Error loading cart:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  /**
   * Add an item to the cart
   * @param {Object} item - Item to add
   */
  const addItem = useCallback(async (item) => {
    try {
      const updatedCart = cartService.addToCart(item);
      setCart(updatedCart);
      setItemCount(cartService.getCartItemCount());
      setTotal(cartService.getCartTotal());
      return updatedCart;
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  }, []);

  /**
   * Update an item in the cart
   * @param {number} index - Index of the item to update
   * @param {Object} updates - Properties to update
   */
  const updateItem = useCallback((index, updates) => {
    try {
      const updatedCart = cartService.updateCartItem(index, updates);
      setCart(updatedCart);
      setItemCount(cartService.getCartItemCount());
      setTotal(cartService.getCartTotal());
      return updatedCart;
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  }, []);

  /**
   * Remove an item from the cart
   * @param {number} index - Index of the item to remove
   */
  const removeItem = useCallback((index) => {
    try {
      const updatedCart = cartService.removeCartItem(index);
      setCart(updatedCart);
      setItemCount(cartService.getCartItemCount());
      setTotal(cartService.getCartTotal());
      return updatedCart;
    } catch (error) {
      console.error('Error removing cart item:', error);
      throw error;
    }
  }, []);

  /**
   * Clear all items from the cart
   */
  const clearCart = useCallback(() => {
    try {
      const emptyCart = cartService.clearCart();
      setCart(emptyCart);
      setItemCount(0);
      setTotal(0);
      return emptyCart;
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }, []);

  return {
    cart,
    itemCount,
    total,
    loading,
    addItem,
    updateItem,
    removeItem,
    clearCart
  };
};

export default useCart;
