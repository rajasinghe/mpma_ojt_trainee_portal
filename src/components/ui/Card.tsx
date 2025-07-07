import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  gradient?: boolean;
  border?: boolean;
  color?: 'default' | 'blue' | 'purple' | 'green' | 'orange' | 'pink' | 'cyan' | 'indigo' | 'yellow';
}

export function Card({ 
  children, 
  className = '', 
  padding = 'md', 
  hover = false, 
  gradient = false,
  border = true,
  color = 'default'
}: CardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const colorClasses = {
    default: gradient 
      ? 'bg-gradient-to-br from-white via-blue-50 to-purple-50' 
      : 'bg-white',
    blue: 'card-blue',
    purple: 'card-purple',
    green: 'card-green',
    orange: 'card-orange',
    pink: 'card-pink',
    cyan: 'card-cyan',
    indigo: 'card-indigo',
    yellow: 'card-yellow'
  };

  const baseClasses = `
    ${colorClasses[color]}
    ${border ? 'border-2 border-gray-200' : ''}
    rounded-xl shadow-lg
    ${hover ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer' : ''}
    ${paddingClasses[padding]}
    ${className}
  `;

  return (
    <div className={baseClasses}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
  color?: 'default' | 'blue' | 'purple' | 'green' | 'orange' | 'pink' | 'cyan';
}

export function CardHeader({ children, className = '', gradient = false, color = 'default' }: CardHeaderProps) {
  const colorClasses = {
    default: gradient ? 'bg-gradient-to-r from-blue-50 to-purple-50' : '',
    blue: 'section-blue',
    purple: 'section-purple',
    green: 'section-green',
    orange: 'section-orange',
    pink: 'section-pink',
    cyan: 'section-cyan'
  };

  return (
    <div className={`
      border-b-2 border-gray-200 pb-4 mb-6
      ${gradient || color !== 'default' ? `${colorClasses[color]} -m-6 mb-6 p-6 rounded-t-xl` : ''}
      ${className}
    `}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  gradient?: boolean;
  color?: 'default' | 'blue' | 'purple' | 'green' | 'orange' | 'pink' | 'cyan';
}

export function CardTitle({ children, className = '', size = 'md', gradient = false, color = 'default' }: CardTitleProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  const colorClasses = {
    default: gradient 
      ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent' 
      : 'text-gray-900',
    blue: 'text-blue-800',
    purple: 'text-purple-800',
    green: 'text-green-800',
    orange: 'text-orange-800',
    pink: 'text-pink-800',
    cyan: 'text-cyan-800'
  };

  return (
    <h3 className={`
      ${sizeClasses[size]} font-bold
      ${colorClasses[color]}
      ${className}
    `}>
      {children}
    </h3>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}