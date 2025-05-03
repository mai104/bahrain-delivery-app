import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Button3D = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  fullWidth = false,
  animated = true,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // تحديد الفئات حسب النوع
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-primary to-primary-dark text-white';
      case 'secondary':
        return 'bg-gradient-to-r from-secondary to-secondary-dark text-white';
      case 'accent':
        return 'bg-gradient-to-r from-accent to-accent-dark text-white';
      case 'outline':
        return 'bg-transparent border-2 border-primary text-primary dark:border-primary-light dark:text-primary-light';
      case 'glass':
        return 'bg-white/20 backdrop-blur-md border border-gray-300/50 dark:border-white/20 text-gray-800 dark:text-white shadow-glow';
      default:
        return 'bg-gradient-to-r from-primary to-primary-dark text-white';
    }
  };

  // تحديد الفئات حسب الحجم
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'py-1.5 px-3 text-sm';
      case 'md':
        return 'py-2.5 px-5 text-base';
      case 'lg':
        return 'py-3 px-6 text-lg';
      case 'xl':
        return 'py-4 px-8 text-xl';
      default:
        return 'py-2.5 px-5 text-base';
    }
  };

  // تجميع الفئات
  const buttonClasses = `
    ${getVariantClasses()}
    ${getSizeClasses()}
    ${fullWidth ? 'w-full' : ''}
    rounded-lg font-medium
    relative overflow-hidden
    focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-primary-light/50
    ${className}
  `;

  // تحديد لون تأثير التحويم بناءً على نوع الزر
  const getHoverEffectClass = () => {
    if (variant === 'outline') {
      return 'bg-primary/10 dark:bg-primary-light/10';
    } else if (variant === 'glass') {
      return 'bg-gray-800/10 dark:bg-white/10';
    } else {
      return 'bg-white/20';
    }
  };

  return (
    <motion.button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      whileHover={animated ? { scale: 1.05, y: -3 } : {}}
      whileTap={animated ? { scale: 0.98 } : {}}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ type: 'spring', stiffness: 500, damping: 17 }}
      {...props}
    >
      {/* تأثير الضوء عند التحويم */}
      {isHovered && animated && (
        <motion.span
          className={`absolute inset-0 ${getHoverEffectClass()}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
      
      {/* تأثير الموجة عند النقر */}
      {animated && (
        <motion.div
          className={`absolute top-0 left-0 right-0 h-1 ${
            variant === 'outline' || variant === 'glass' 
              ? 'bg-primary/30 dark:bg-primary-light/30' 
              : 'bg-white/40'
          }`}
          initial={{ scaleX: 0, originX: 0 }}
          whileTap={{ scaleX: 1, transition: { duration: 0.5 } }}
        />
      )}
      
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default Button3D;
