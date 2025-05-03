import React from 'react';

const RatingStars = ({ 
  rating, 
  maxRating = 5, 
  size = 'md', 
  showNumber = false,
  reviewsCount = 0,
  activeColor = 'yellow-400',
  inactiveColor = 'gray-300'
}) => {
  // تحديد حجم النجم
  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'w-3 h-3';
      case 'md': return 'w-5 h-5';
      case 'lg': return 'w-6 h-6';
      case 'xl': return 'w-8 h-8';
      default: return 'w-5 h-5';
    }
  };
  
  // تحويل التقييم إلى رقم
  const numericRating = parseFloat(rating) || 0;
  
  // النص المعروض مع التقييم
  const ratingText = (count) => {
    if (count === 0) return '';
    return count === 1 
      ? (count + ' تقييم') 
      : (count + ' تقييمات');
  };

  return (
    <div className="flex items-center">
      <div className="flex">
        {[...Array(maxRating)].map((_, i) => (
          <svg
            key={i}
            className={`${getSizeClass()} ${
              i < Math.floor(numericRating)
                ? `text-${activeColor}`
                : i < numericRating
                  ? `text-${activeColor}/50`
                  : `text-${inactiveColor} dark:text-${inactiveColor}/50`
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      
      {showNumber && (
        <span className="text-sm text-gray-500 dark:text-gray-400 ms-2">
          {numericRating.toFixed(1)} {reviewsCount > 0 && `(${ratingText(reviewsCount)})`}
        </span>
      )}
    </div>
  );
};

export default RatingStars;
