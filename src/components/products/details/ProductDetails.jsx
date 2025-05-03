import React from 'react';

const ProductDetails = ({ 
  longDescription, 
  title = 'التفاصيل'
}) => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        {title}
      </h2>
      
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        {longDescription}
      </p>
    </div>
  );
};

export default ProductDetails;
