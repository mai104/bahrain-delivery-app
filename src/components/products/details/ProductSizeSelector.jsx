import React from 'react';

const ProductSizeSelector = ({ 
  sizes, 
  selectedSize, 
  onChange, 
  labelText = 'الحجم:' 
}) => {
  return (
    <div className="mb-6">
      {/* عنوان قسم الأحجام */}
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {labelText}
      </h3>
      
      {/* أزرار اختيار الحجم */}
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size.id}
            onClick={() => onChange(size.id)}
            className={`
              px-4 py-2 rounded-lg transition-colors
              ${selectedSize === size.id 
                ? 'bg-primary text-white dark:bg-primary-dark' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}
            `}
          >
            {size.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductSizeSelector;
