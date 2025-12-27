import React from 'react';

const Card = ({
  children,
  className = '',
  hover = false,
  padding = 'md',
  ...props
}) => {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const baseStyles = 'bg-white rounded-lg shadow-sm border border-secondary-200 transition-shadow duration-200';
  const hoverStyles = hover ? 'hover:shadow-md cursor-pointer' : '';

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${paddings[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
