import React from 'react';

/**
 * Card Component
 * 
 * A flexible card component for displaying content in a contained box.
 * 
 * @param {ReactNode} children - Card content
 * @param {string} className - Additional CSS classes
 * @param {boolean} hover - Enable hover effects
 * @param {boolean} padding - Apply padding to the card
 */
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

/**
 * CardTitle Component
 * 
 * Title section for the Card component.
 */
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

/**
 * CardContent Component
 * 
 * Content section for the Card component.
 */
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

/**
 * CardFooter Component
 * 
 * Footer section for the Card component, usually contains actions.
 */
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

/**
 * CardHeader Component
 * 
 * Header section for the Card component, usually contains a title and actions.
 */
export const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`flex items-center justify-between mb-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * CardImage Component
 * 
 * Image section for the Card component.
 */
export const CardImage = ({ src, alt, className = '', ...props }) => {
  return (
    <div 
      className={`w-full h-48 rounded-t-lg overflow-hidden mb-4 ${className}`}
      {...props}
    >
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Card;
