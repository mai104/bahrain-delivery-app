import React from 'react';

const ProductFeatures = ({ 
  features, 
  title = 'المميزات',
  columns = 2
}) => {
  return (
    <div className="mt-8">
      {/* عنوان قسم الميزات */}
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        {title}
      </h3>
      
      {/* قائمة الميزات */}
      <ul className={`grid grid-cols-1 ${columns === 2 ? 'sm:grid-cols-2' : ''} gap-y-2 gap-x-4`}>
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
            <svg className="w-5 h-5 text-primary dark:text-primary-light mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {feature.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductFeatures;
