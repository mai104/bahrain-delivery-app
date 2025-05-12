import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';

/**
 * ProductFeatures component
 * 
 * Displays a list of product features with icons.
 */
const ProductFeatures = ({ features }) => {
  const { isArabic } = useLanguage();
  
  // Text based on language
  const featuresText = isArabic ? 'المميزات' : 'Features';
  
  // If no features are available, don't render
  if (!features || features.length === 0) {
    return null;
  }
  
  // Get localized feature names
  const getLocalizedName = (feature) => {
    return isArabic ? feature.name : (feature.nameEn || feature.name);
  };

  return (
    <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
        {featuresText}
      </h3>
      
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={feature.id || index} className="flex items-center text-gray-600 dark:text-gray-400">
            <svg className="h-5 w-5 text-primary dark:text-primary-dark mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {getLocalizedName(feature)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductFeatures;
