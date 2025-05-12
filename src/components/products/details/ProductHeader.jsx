/**
 * ProductHeader
 * 
 * CURRENTLY UNUSED
 * 
 * Purpose: Displays the product title and rating information
 * Future Use: Will be used in the refactored ProductDetailsPage for better modularity
 * 
 * Note: This component is part of the modular product details design. It includes
 * the product name, star rating, and review count.
 */

import React from 'react';
import RatingStars from '../../ui/RatingStars';

const ProductHeader = ({ 
  name, 
  rating, 
  reviewsCount,
  outOfText = 'من 5',
  reviewsText = 'تقييمات'
}) => {
  return (
    <div className="mb-4">
      {/* عنوان المنتج */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
        {name}
      </h1>
      
      {/* التقييم والمراجعات */}
      <div className="flex items-center mb-2">
        <RatingStars 
          rating={rating} 
          showNumber={false} 
        />
        
        <span className="text-sm text-gray-500 dark:text-gray-400 ms-2">
          {rating} {outOfText} ({reviewsCount} {reviewsText})
        </span>
      </div>
    </div>
  );
};

export default ProductHeader;
