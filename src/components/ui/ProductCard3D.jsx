import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import Button3D from './Button3D';

const ProductCard3D = ({ product, index = 0 }) => {
  const { isArabic } = useLanguage();
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);
  
  // Motion values for 3D effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Transform rotation based on mouse position
  const rotateY = useTransform(x, [-100, 100], [15, -15]);
  const rotateX = useTransform(y, [-100, 100], [-15, 15]);
  
  // Textos según el idioma
  const texts = {
    currency: isArabic ? 'د.ب' : 'BHD',
    viewDetails: isArabic ? 'عرض التفاصيل' : 'View Details',
    addToCart: isArabic ? 'أضف إلى السلة' : 'Add to Cart',
    discount: isArabic ? 'خصم' : 'OFF',
  };
  
  // Obtener datos según el idioma
  const localizedProduct = {
    ...product,
    name: isArabic ? product.name : product.nameEn || product.name,
    description: isArabic ? product.description : product.descriptionEn || product.description,
  };
  
  // Handle mouse movement for 3D effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position relative to card center
    const offsetX = e.clientX - (rect.left + width / 2);
    const offsetY = e.clientY - (rect.top + height / 2);
    
    // Set motion values
    x.set(offsetX);
    y.set(offsetY);
  };
  
  // Reset on mouse leave
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative h-[400px] rounded-xl overflow-hidden cursor-pointer bg-white dark:bg-gray-800 shadow-lg group perspective-1000"
      style={{
        transformStyle: "preserve-3d",
        rotateY,
        rotateX,
        z: hovered ? 50 : 0,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* Card Content */}
      <div className="flex flex-col h-full">
        {/* Image Container */}
        <div className="relative w-full h-[200px] overflow-hidden">
          {/* Product Image */}
          <motion.img
            src={localizedProduct.image}
            alt={localizedProduct.name}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.1 : 1 }}
            transition={{ duration: 0.6 }}
            style={{ transformStyle: "preserve-3d", z: 20 }}
          />
          
          {/* Discount Badge */}
          {localizedProduct.discount > 0 && (
            <div className="absolute top-3 right-3 bg-accent text-white text-sm font-bold px-2 py-1 rounded-md">
              {localizedProduct.discount}% {texts.discount}
            </div>
          )}
          
          {/* Gradient Overlay on Hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0"
            animate={{ opacity: hovered ? 0.8 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Quick View Button */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link to={`/products/${localizedProduct.id}`}>
              <motion.button
                className="bg-white/90 text-primary px-4 py-2 rounded-full font-medium transform-gpu"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 20 }}
                animate={{ y: hovered ? 0 : 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {texts.viewDetails}
              </motion.button>
            </Link>
          </motion.div>
        </div>
        
        {/* Product Info */}
        <div className="p-4 flex flex-col flex-grow">
          <motion.h3
            className="text-lg font-bold text-gray-800 dark:text-white mb-1 truncate"
            animate={{ y: hovered ? -5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {localizedProduct.name}
          </motion.h3>
          
          <motion.p
            className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2"
            animate={{ opacity: hovered ? 0.5 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {localizedProduct.description}
          </motion.p>
          
          {/* Price */}
          <div className="mt-auto flex items-center">
            <span className="text-lg font-bold text-primary dark:text-primary-light">
              {localizedProduct.price} {texts.currency}
            </span>
            
            {localizedProduct.oldPrice && (
              <span className="ms-2 text-sm text-gray-500 line-through">
                {localizedProduct.oldPrice} {texts.currency}
              </span>
            )}
          </div>
        </div>
        
        {/* Add to Cart Button (fixed at bottom) */}
        <motion.div
          className="px-4 pb-4"
          animate={{ y: hovered ? 0 : 10, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <Button3D
            variant="primary"
            className="w-full"
            animated={false}
          >
            {texts.addToCart}
          </Button3D>
        </motion.div>
      </div>
      
      {/* 3D floating particles on hover */}
      {hovered && (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/20"
              initial={{ 
                top: Math.random() * 400,
                left: Math.random() * 100 + 50,
                width: Math.random() * 8 + 4,
                height: Math.random() * 8 + 4,
                opacity: 0
              }}
              animate={{ 
                top: [null, 0],
                opacity: [0, 0.8, 0],
                transition: { 
                  duration: Math.random() * 2 + 1,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: Math.random() * 0.5
                }
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
};

export default ProductCard3D;
