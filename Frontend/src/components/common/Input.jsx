import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';


const Input = ({
  label,
  error,
  helperText,
  icon,
  type = 'text',
  className = '',
  containerClassName = '',
  ...props
}) => {


  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;


  const togglePassword = () => {
    setShowPassword(!showPassword);
  };


  const inputClasses = `
    w-full px-4 py-2.5 rounded-lg border
    ${error ? 'border-danger-500 focus:border-danger-600 focus:ring-danger-500' : 'border-secondary-300 focus:border-primary-500 focus:ring-primary-500'}
    ${icon ? 'pl-10' : ''}
    ${isPassword ? 'pr-10' : ''}
    focus:outline-none focus:ring-2 focus:ring-offset-0
    disabled:bg-secondary-100 disabled:cursor-not-allowed
    transition-colors duration-200
    ${className}
  `;


  return (
    <div className={`${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-secondary-700 mb-1.5">
          {label}
        </label>
      )}


      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-secondary-400">{icon}</span>
          </div>
        )}
        <input
          type={inputType}
          className={inputClasses}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-secondary-400 hover:text-secondary-600 focus:outline-none"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-danger-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-secondary-500">{helperText}</p>
      )}
    </div>
  );
};

export default Input;
