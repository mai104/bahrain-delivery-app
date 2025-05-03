import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import Card from '../ui/Card';
import Button from '../ui/Button';

const ProductCard = ({ product }) => {
  const { isArabic } = useLanguage();
  
  // النصوص حسب اللغة
  const texts = {
    viewDetails: isArabic ? 'عرض التفاصيل' : 'View Details',
    addToCart: isArabic ? 'أضف إلى السلة' : 'Add to Cart',
    sar: isArabic ? 'د.ب' : 'BHD',
  };

  return (
    <Card className="flex flex-col h-full">
      <div className="relative mb-3 rounded-lg overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
        
        {product.discount > 0 && (
          <div className="absolute top-2 start-2 bg-accent dark:bg-accent-dark text-white px-2 py-1 rounded-md text-xs font-medium">
            {product.discount}% {isArabic ? 'خصم' : 'OFF'}
          </div>
        )}
      </div>
      
      <div className="flex-grow">
        <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-gray-200">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {product.description}
        </p>
        
        <div className="flex items-center mb-3">
          <span className="text-lg font-bold text-primary dark:text-primary-dark">
            {product.price} {texts.sar}
          </span>
          
          {product.oldPrice && (
            <span className="ms-2 text-sm text-gray-500 line-through">
              {product.oldPrice} {texts.sar}
            </span>
          )}
        </div>
      </div>
      
      <div className="flex gap-2 mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
        <Link to={`/products/${product.id}`} className="flex-1">
          <Button variant="outline" fullWidth>
            {texts.viewDetails}
          </Button>
        </Link>
        
        <Button variant="primary" className="flex-1">
          {texts.addToCart}
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
