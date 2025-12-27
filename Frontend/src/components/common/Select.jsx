import React from 'react';

const Select = ({
  label,
  error,
  helperText,
  options = [],
  className = '',
  containerClassName = '',
  ...props
}) => {
  const selectClasses = `
    w-full px-4 py-2.5 rounded-lg border
    ${error ? 'border-danger-500 focus:border-danger-600 focus:ring-danger-500' : 'border-secondary-300 focus:border-primary-500 focus:ring-primary-500'}
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
      <select className={selectClasses} {...props}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1.5 text-sm text-danger-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-secondary-500">{helperText}</p>
      )}
    </div>
  );
};

export default Select;
