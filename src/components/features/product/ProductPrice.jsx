import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';

/**
 * ProductPrice component
 * 
 * Displays the product price information including regular price, 
 * discount price, and discount percentage.
 */
const ProductPrice = ({ price, oldPrice, discount, size = 'medium' }) => {
  const { isArabic } = useLanguage();
  
  // Size classes
  const sizeClasses = {
    small: {
      price: 'text-lg',
      oldPrice: 'text-xs'
    },
    medium: {
      price: 'text-2xl',
      oldPrice: 'text-sm'
    },
    large: {
      price: 'text-3xl',
      oldPrice: 'text-base'
    }
  };

  // Currency based on language
  const currency = isArabic ? 'د.ب' : 'BHD';
  const discountText = isArabic ? 'خصم' : 'OFF';
  
  const classes = sizeClasses[size] || sizeClasses.medium;

  return (
    <div className="flex items-center mb-4">
      <span className={`font-bold text-primary dark:text-primary-dark ${classes.price}`}>
        {price} {currency}
      </span>
      
      {oldPrice && (
        <span className={`ms-3 text-gray-500 line-through ${classes.oldPrice}`}>
          {oldPrice} {currency}
        </span>
      )}
      
      {discount > 0 && (
        <span className="ms-3 px-2 py-1 bg-accent text-white text-sm rounded">
          {discount}% {discountText}
        </span>
      )}
    </div>
  );
};

export default ProductPrice;
