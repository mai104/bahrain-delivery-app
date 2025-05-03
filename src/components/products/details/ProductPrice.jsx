import React from 'react';

const ProductPrice = ({ 
  price, 
  oldPrice, 
  discount, 
  currency = 'د.ب',
  discountText = 'خصم'
}) => {
  return (
    <div className="flex items-center mt-4">
      {/* السعر الحالي */}
      <span className="text-3xl font-bold text-primary dark:text-primary-light">
        {price} {currency}
      </span>
      
      {/* السعر القديم إذا كان هناك خصم */}
      {oldPrice && oldPrice > price && (
        <span className="ms-3 text-gray-500 line-through">
          {oldPrice} {currency}
        </span>
      )}
      
      {/* شارة الخصم */}
      {discount > 0 && (
        <span className="ms-3 bg-accent/10 text-accent dark:bg-accent-dark/20 dark:text-accent-light px-2 py-1 rounded text-sm font-medium">
          {discount}% {discountText}
        </span>
      )}
    </div>
  );
};

export default ProductPrice;
