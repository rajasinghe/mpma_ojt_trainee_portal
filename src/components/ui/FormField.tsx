import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function FormField({ label, error, required = false, children, className = '' }: FormFieldProps) {
  return (
    <div className={`space-y-1 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 font-medium">{error}</p>
      )}
    </div>
  );
}

interface ValidatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: typeof LucideIcon;
  iconPosition?: 'left' | 'right';
}

export function ValidatedInput({
  label,
  error,
  icon: Icon,
  iconPosition = 'left',
  required = false,
  className = '',
  ...props
}: ValidatedInputProps) {
  return (
    <FormField label={label} error={error} required={required}>
      <div className="relative">
        {Icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          className={`
            block w-full px-4 py-3 rounded-lg shadow-sm border
            placeholder-gray-400 transition-all duration-300 
            hover:border-gray-400 focus:shadow-lg focus:outline-none
            ${error 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            }
            ${Icon && iconPosition === 'left' ? 'pl-10' : ''}
            ${Icon && iconPosition === 'right' ? 'pr-10' : ''}
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white
            dark:border-gray-600 dark:focus:border-blue-400
            ${className}
          `}
          {...props}
        />
        {Icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
      </div>
    </FormField>
  );
}

interface ValidatedTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function ValidatedTextarea({
  label,
  error,
  required = false,
  className = '',
  ...props
}: ValidatedTextareaProps) {
  return (
    <FormField label={label} error={error} required={required}>
      <textarea
        className={`
          block w-full px-4 py-3 rounded-lg shadow-sm border
          placeholder-gray-400 transition-all duration-300 
          hover:border-gray-400 focus:shadow-lg focus:outline-none
          ${error 
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
          }
          bg-white dark:bg-gray-700 text-gray-900 dark:text-white
          dark:border-gray-600 dark:focus:border-blue-400
          ${className}
        `}
        {...props}
      />
    </FormField>
  );
}

interface ValidatedSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function ValidatedSelect({
  label,
  error,
  options,
  required = false,
  className = '',
  ...props
}: ValidatedSelectProps) {
  return (
    <FormField label={label} error={error} required={required}>
      <select
        className={`
          block w-full px-4 py-3 rounded-lg shadow-sm border
          transition-all duration-300 hover:border-gray-400 focus:shadow-lg focus:outline-none
          ${error 
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
          }
          bg-white dark:bg-gray-700 text-gray-900 dark:text-white
          dark:border-gray-600 dark:focus:border-blue-400
          ${className}
        `}
        {...props}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FormField>
  );
}