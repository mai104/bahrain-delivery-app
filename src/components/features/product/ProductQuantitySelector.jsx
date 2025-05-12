import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';

/**
 * ProductQuantitySelector component
 * 
 * Provides controls for selecting product quantity with increment/decrement buttons.
 */
const ProductQuantitySelector = ({ 
  quantity, 
  onIncrement, 
  onDecrement,
  min = 1,
  max = 99
}) => {
  const { isArabic } = useLanguage();
  
  // Text based on language
  const quantityText = isArabic ? 'الكمية:' : 'Quantity:';
  
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {quantityText}
      </h3>
      
      <div className="flex items-center">
        <button
          onClick={onDecrement}
          disabled={quantity <= min}
          className={`
            w-10 h-10 flex items-center justify-center border 
            border-gray-300 dark:border-gray-600 rounded-s-md 
            bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400
            ${quantity <= min ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 dark:hover:bg-gray-600'}
          `}
          aria-label="Decrease quantity"
        >
          <span className="text-xl">-</span>
        </button>
        
        <div className="w-14 h-10 flex items-center justify-center border-t border-b border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
          {quantity}
        </div>
        
        <button
          onClick={onIncrement}
          disabled={quantity >= max}
          className={`
            w-10 h-10 flex items-center justify-center border 
            border-gray-300 dark:border-gray-600 rounded-e-md 
            bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400
            ${quantity >= max ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 dark:hover:bg-gray-600'}
          `}
          aria-label="Increase quantity"
        >
          <span className="text-xl">+</span>
        </button>
      </div>
    </div>
  );
};

export default ProductQuantitySelector;
