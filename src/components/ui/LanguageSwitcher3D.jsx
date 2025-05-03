import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

const LanguageSwitcher3D = () => {
  const { language, isArabic, changeLanguage } = useLanguage();
  
  // Toggle language
  const handleToggleLanguage = () => {
    changeLanguage(isArabic ? 'en' : 'ar');
  };
  
  // Animation variants
  const containerVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };
  
  const switcherVariants = {
    ar: { x: 0 },
    en: { x: isArabic ? '-100%' : '100%' }
  };
  
  const textVariants = {
    active: { opacity: 1, y: 0 },
    inactive: { opacity: 0, y: 10 }
  };

  return (
    <motion.button 
      className="relative w-16 h-8 rounded-full bg-gray-200 dark:bg-gray-700 focus:outline-none shadow-inner overflow-hidden"
      onClick={handleToggleLanguage}
      variants={containerVariants}
      whileHover="hover"
      whileTap="tap"
      aria-label={isArabic ? 'Switch to English' : 'التبديل إلى العربية'}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {/* Arabic pattern */}
          <div className={`absolute inset-0 transition-opacity duration-300 ${isArabic ? 'opacity-100' : 'opacity-0'}`}>
            {/* Arabic calligraphy pattern - simplified */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-t border-r border-black dark:border-white rounded-tr-full opacity-10"></div>
          </div>
          
          {/* English pattern */}
          <div className={`absolute inset-0 transition-opacity duration-300 ${isArabic ? 'opacity-0' : 'opacity-100'}`}>
            {/* Latin alphabet pattern - simplified */}
            <div className="grid grid-cols-2 gap-1 p-1 opacity-10">
              {[..."ABC"].map((char, i) => (
                <div key={i} className="text-[6px] text-black dark:text-white">{char}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Switcher handle */}
      <motion.div 
        className="absolute top-1 bottom-1 w-7 rounded-full bg-primary dark:bg-primary-dark shadow-md"
        style={{ left: isArabic ? '1px' : 'auto', right: isArabic ? 'auto' : '1px' }}
        variants={switcherVariants}
        animate={language}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Arabic Label */}
          <motion.span 
            className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white"
            variants={textVariants}
            animate={isArabic ? 'active' : 'inactive'}
            initial={isArabic ? 'active' : 'inactive'}
            transition={{ duration: 0.2 }}
          >
            ع
          </motion.span>
          
          {/* English Label */}
          <motion.span 
            className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white"
            variants={textVariants}
            animate={!isArabic ? 'active' : 'inactive'}
            initial={!isArabic ? 'active' : 'inactive'}
            transition={{ duration: 0.2 }}
          >
            EN
          </motion.span>
        </div>
      </motion.div>
      
      {/* Static labels */}
      <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
        <span className={`text-xs font-medium ${isArabic ? 'text-gray-500 dark:text-gray-400' : 'text-transparent'}`}>
          ع
        </span>
        <span className={`text-xs font-medium ${!isArabic ? 'text-gray-500 dark:text-gray-400' : 'text-transparent'}`}>
          EN
        </span>
      </div>
      
      {/* Hover effects */}
      <motion.div 
        className="absolute inset-0 bg-primary/10 dark:bg-primary-dark/10 rounded-full opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  );
};

export default LanguageSwitcher3D;
