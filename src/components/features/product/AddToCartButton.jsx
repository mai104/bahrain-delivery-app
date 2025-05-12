import React, { useState } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import Button from '../../common/buttons/Button';

/**
 * AddToCartButton component
 * 
 * Button for adding products to cart with loading and success states.
 */
const AddToCartButton = ({ 
  onClick, 
  disabled = false,
  className = '',
  size = 'lg',
  fullWidth = true
}) => {
  const { isArabic } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Text based on language
  const addToCartText = isArabic ? 'أضف إلى السلة' : 'Add to Cart';
  const addingText = isArabic ? 'جاري الإضافة...' : 'Adding...';
  const addedText = isArabic ? 'تمت الإضافة' : 'Added to Cart';
  
  const handleClick = async () => {
    if (loading || disabled) return;
    
    setLoading(true);
    
    try {
      await onClick();
      setSuccess(true);
      
      // Reset success state after 2 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
      
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Button text based on state
  const buttonText = loading ? addingText : (success ? addedText : addToCartText);
  
  // Button variant based on state
  const variant = success ? 'success' : 'primary';

  return (
    <Button
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      onClick={handleClick}
      disabled={loading || disabled}
      className={className}
    >
      {buttonText}
      
      {/* Status icons */}
      {loading && (
        <svg className="animate-spin -mr-1 ml-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {success && (
        <svg className="ml-2 -mr-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
        </svg>
      )}
    </Button>
  );
};

export default AddToCartButton;
