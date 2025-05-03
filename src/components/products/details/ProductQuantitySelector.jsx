import React from 'react';

const ProductQuantitySelector = ({ 
  quantity, 
  onIncrease, 
  onDecrease, 
  labelText = 'الكمية:',
  minQuantity = 1,
  maxQuantity = 100
}) => {
  return (
    <div className="mb-6">
      {/* عنوان قسم الكمية */}
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {labelText}
      </h3>
      
      {/* أزرار التحكم بالكمية */}
      <div className="flex">
        {/* زر تقليل الكمية */}
        <button
          onClick={onDecrease}
          disabled={quantity <= minQuantity}
          className={`
            w-10 h-10 flex items-center justify-center border border-gray-300 dark:border-gray-600 
            rounded-s-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400
            ${quantity <= minQuantity ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 dark:hover:bg-gray-600'}
          `}
          aria-label="تقليل الكمية"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        
        {/* عرض الكمية الحالية */}
        <div className="w-14 h-10 flex items-center justify-center border-t border-b border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
          {quantity}
        </div>
        
        {/* زر زيادة الكمية */}
        <button
          onClick={onIncrease}
          disabled={quantity >= maxQuantity}
          className={`
            w-10 h-10 flex items-center justify-center border border-gray-300 dark:border-gray-600 
            rounded-e-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400
            ${quantity >= maxQuantity ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 dark:hover:bg-gray-600'}
          `}
          aria-label="زيادة الكمية"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductQuantitySelector;
