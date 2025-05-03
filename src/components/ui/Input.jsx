import React, { forwardRef } from 'react';

const Input = forwardRef(({ 
  label,
  id,
  name,
  type = 'text',
  error,
  helperText,
  className = '',
  required = false,
  placeholder,
  readOnly = false,
  disabled = false,
  ...props 
}, ref) => {
  const inputClasses = `
    w-full px-4 py-2 rounded-md 
    border ${error ? 'border-danger' : 'border-gray-300 dark:border-gray-600'} 
    ${disabled ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed' : 'bg-white dark:bg-gray-700'} 
    text-gray-900 dark:text-white
    placeholder-gray-400 dark:placeholder-gray-500
    focus:border-primary dark:focus:border-primary-dark 
    focus:ring-1 focus:ring-primary dark:focus:ring-primary-dark
    focus:outline-none
    transition-colors
    ${className}
  `;

  return (
    <div className="mb-4">
      {label && (
        <label 
          htmlFor={id || name} 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
          {required && <span className="text-danger">*</span>}
        </label>
      )}
      
      <input
        ref={ref}
        id={id || name}
        name={name}
        type={type}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        className={inputClasses}
        {...props}
      />
      
      {(error || helperText) && (
        <p className={`mt-1 text-sm ${error ? 'text-danger' : 'text-gray-500 dark:text-gray-400'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
