import React from 'react';

/**
 * Button Component
 * 
 * A flexible button component that supports different variants, sizes, and states.
 * 
 * @param {ReactNode} children - Button content
 * @param {string} variant - Button style variant (primary, secondary, accent, outline, ghost, success)
 * @param {string} size - Button size (sm, md, lg, xl)
 * @param {string} className - Additional CSS classes
 * @param {boolean} isLoading - Shows loading spinner when true
 * @param {boolean} disabled - Disables the button when true
 * @param {function} onClick - Click handler function
 * @param {string} type - Button type (button, submit, reset)
 * @param {boolean} fullWidth - Makes the button take the full width of its container
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  isLoading = false,
  disabled = false,
  onClick,
  type = 'button',
  fullWidth = false,
  ...props 
}) => {
  // Determine classes based on variant
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary text-white hover:bg-primary-dark dark:bg-primary-dark dark:hover:bg-primary';
      case 'secondary':
        return 'bg-secondary text-white hover:bg-secondary-dark dark:bg-secondary-dark dark:hover:bg-secondary';
      case 'accent':
        return 'bg-accent text-white hover:bg-accent-dark dark:bg-accent-dark dark:hover:bg-accent';
      case 'outline':
        return 'border border-primary text-primary hover:bg-primary/10 dark:border-primary-dark dark:text-primary-dark dark:hover:bg-primary-dark/10';
      case 'ghost':
        return 'text-primary hover:bg-primary/10 dark:text-primary-dark dark:hover:bg-primary-dark/10';
      case 'success':
        return 'bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600';
      default:
        return 'bg-primary text-white hover:bg-primary-dark dark:bg-primary-dark dark:hover:bg-primary';
    }
  };

  // Determine classes based on size
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'py-1 px-3 text-sm';
      case 'md':
        return 'py-2 px-4 text-base';
      case 'lg':
        return 'py-2.5 px-5 text-lg';
      case 'xl':
        return 'py-3 px-6 text-xl';
      default:
        return 'py-2 px-4 text-base';
    }
  };

  // Combine all classes
  const buttonClasses = `
    ${getVariantClasses()}
    ${getSizeClasses()}
    ${fullWidth ? 'w-full' : ''}
    rounded-lg font-medium transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-primary-dark/50
    ${disabled || isLoading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
    flex items-center justify-center
  `;

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
