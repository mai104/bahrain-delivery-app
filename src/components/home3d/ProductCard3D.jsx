import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import Button3D from '../ui/Button3D';
import gsap from 'gsap';

const ProductCard3D = ({ product }) => {
  const { isArabic } = useLanguage();
  const cardRef = useRef(null);
  
  // 3D hover effect
  useEffect(() => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    
    const rotateCard = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        duration: 0.5,
        ease: 'power2.out',
      });
    };
    
    const resetCard = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    };
    
    card.addEventListener('mousemove', rotateCard);
    card.addEventListener('mouseleave', resetCard);
    
    return () => {
      card.removeEventListener('mousemove', rotateCard);
      card.removeEventListener('mouseleave', resetCard);
    };
  }, []);
  
  return (
    <div 
      ref={cardRef}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transform transition-all hover:scale-[1.03] backdrop-blur-sm bg-opacity-70 dark:bg-opacity-60 border border-white/20 dark:border-gray-700/30"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform hover:scale-110"
        />
        
        {product.discount > 0 && (
          <div className="absolute top-2 right-2 bg-accent dark:bg-accent-dark text-white px-2 py-1 rounded-full text-xs font-bold">
            -{product.discount}%
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-lg font-bold text-primary dark:text-primary-light">
              {product.price.toFixed(2)} BD
            </span>
            
            {product.oldPrice && (
              <span className="text-sm text-gray-500 dark:text-gray-400 line-through ml-2 rtl:mr-2">
                {product.oldPrice.toFixed(2)} BD
              </span>
            )}
          </div>
          
          <Link to={`/products/${product.id}`}>
            <Button3D 
              variant="primary" 
              size="sm"
            >
              {isArabic ? 'اطلب الآن' : 'Order Now'}
            </Button3D>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard3D;
