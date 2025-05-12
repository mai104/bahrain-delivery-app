import React from 'react';

/**
 * ProductGallery component
 * 
 * Displays a product image gallery with main image and thumbnails.
 */
const ProductGallery = ({ 
  images, 
  alt, 
  selectedImage, 
  onImageChange 
}) => {
  // Display placeholder if no images
  if (!images || images.length === 0) {
    return (
      <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 flex items-center justify-center">
        <span className="text-gray-500 dark:text-gray-400">
          No image available
        </span>
      </div>
    );
  }

  return (
    <div>
      {/* Main Image */}
      <div className="mb-4 rounded-lg overflow-hidden">
        <img 
          src={images[selectedImage]} 
          alt={alt} 
          className="w-full h-auto object-cover"
        />
      </div>
      
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex space-x-2 rtl:space-x-reverse">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => onImageChange(index)}
              className={`
                w-20 h-20 rounded-md overflow-hidden border-2
                ${selectedImage === index 
                  ? 'border-primary dark:border-primary-dark' 
                  : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'}
                transition-all duration-200
              `}
              aria-label={`Select image ${index + 1}`}
            >
              <img 
                src={image} 
                alt={`${alt} - ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
