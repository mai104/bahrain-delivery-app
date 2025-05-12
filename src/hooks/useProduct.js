/**
 * useProduct Hook
 * 
 * Custom hook for handling product data fetching and state management.
 */

import { useState, useEffect } from 'react';
import { getProductById, getRelatedProducts } from '../services/productService';

/**
 * Hook for fetching and managing product data
 * @param {number|string} productId - The ID of the product to fetch
 * @returns {Object} - Object containing product data, loading state, error state, and related products
 */
const useProduct = (productId) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const productData = await getProductById(productId);
        setProduct(productData);
        
        // Set default selected size if available
        if (productData.sizes && productData.sizes.length > 0) {
          setSelectedSize(productData.sizes[0].id);
        }
        
        // Reset image selection when product changes
        setSelectedImage(0);
        
        // Reset quantity
        setQuantity(1);
      } catch (err) {
        setError(err.message || 'Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  // Fetch related products when product data is available
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (product) {
        try {
          setRelatedLoading(true);
          const related = await getRelatedProducts(product.id, product.category);
          setRelatedProducts(related);
        } catch (err) {
          console.error('Failed to fetch related products:', err);
        } finally {
          setRelatedLoading(false);
        }
      }
    };

    fetchRelatedProducts();
  }, [product]);

  // Increment quantity
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  // Decrement quantity
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  // Change selected image
  const changeImage = (index) => {
    setSelectedImage(index);
  };

  // Change selected size
  const changeSize = (sizeId) => {
    setSelectedSize(sizeId);
  };

  return {
    product,
    loading,
    error,
    relatedProducts,
    relatedLoading,
    selectedImage,
    selectedSize,
    quantity,
    incrementQuantity,
    decrementQuantity,
    changeImage,
    changeSize
  };
};

export default useProduct;
