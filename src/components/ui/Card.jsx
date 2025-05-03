import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = true,
  padding = true,
  ...props 
}) => {
  return (
    <div 
      className={`
        bg-white dark:bg-gray-800 
        rounded-lg 
        ${padding ? 'p-4' : ''} 
        shadow-card dark:shadow-none dark:border dark:border-gray-700
        ${hover ? 'hover:shadow-lg dark:hover:border-gray-600 transition-all duration-300' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

// مكون عنوان البطاقة
export const CardTitle = ({ children, className = '', ...props }) => {
  return (
    <h3 
      className={`text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
};

// مكون محتوى البطاقة
export const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`text-gray-600 dark:text-gray-400 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// مكون تذييل البطاقة
export const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
