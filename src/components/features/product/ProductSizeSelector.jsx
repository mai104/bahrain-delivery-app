import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';

/**
 * ProductSizeSelector component
 * 
 * Allows users to select from available product sizes.
 */
const ProductSizeSelector = ({ 
  sizes, 
  selectedSizeId, 
  onChange 
}) => {
  const { isArabic } = useLanguage();
  
  // Text based on language
  const sizeText = isArabic ? 'الحجم:' : 'Size:';
  
  // If no sizes are available, don't render
  if (!sizes || sizes.length === 0) {
    return null;
  }
  
  // Get localized size names
  const getLocalizedName = (size) => {
    return isArabic ? size.name : (size.nameEn || size.name);
  };

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {sizeText}
      </h3>
      
      <div className="flex flex-wrap gap-2">
        {sizes.map(size => (
          <button
            key={size.id}
            onClick={() => onChange(size.id)}
            className={`
              px-4 py-2 border rounded-md transition-colors
              ${selectedSizeId === size.id 
                ? 'border-primary bg-primary/10 text-primary dark:border-primary-dark dark:bg-primary-dark/10 dark:text-primary-dark' 
                : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}
            `}
          >
            {getLocalizedName(size)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductSizeSelector;
