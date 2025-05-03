import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const LanguageSwitcher = ({ className = '' }) => {
  const { language, toggleLanguage } = useLanguage();
  
  return (
    <button
      onClick={toggleLanguage}
      className={`
        inline-flex items-center justify-center
        px-3 py-1.5 rounded-md
        text-sm font-medium 
        bg-gray-100 dark:bg-gray-700 
        text-gray-700 dark:text-gray-300
        hover:bg-gray-200 dark:hover:bg-gray-600
        transition-colors
        ${className}
      `}
      aria-label={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
    >
      {language === 'ar' ? 'English' : 'العربية'}
    </button>
  );
};

export default LanguageSwitcher;
