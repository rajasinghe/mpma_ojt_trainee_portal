import type React from "react";
import type { UseFormRegister, FieldErrors, FieldValues, Path } from "react-hook-form";

interface BaseInputProps {
  type?: "text" | "number" | "email" | "password" | "date" | "time" | string;
  id?: string;
  placeholder?: string;
  className?: string;
  min?: string;
  max?: string;
  step?: number;
  disabled?: boolean;
  success?: boolean;
  error?: boolean | string;
  hint?: string;
}

interface StandardInputProps extends BaseInputProps {
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  register?: never;
  errors?: never;
  rules?: never;
}

interface HookFormInputProps<T extends FieldValues> extends BaseInputProps {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  rules?: Object;
  value?: never;
  onChange?: never;
  name: Path<T>;
}

type InputProps<T extends FieldValues> = StandardInputProps | HookFormInputProps<T>;

const Input = <T extends FieldValues>({
  type = "text",
  id,
  name,
  placeholder,
  value,
  onChange,
  register,
  errors,
  rules,
  className = "",
  min,
  max,
  step,
  disabled = false,
  success = false,
  error = false,
  hint,
}: InputProps<T>) => {
  let inputClasses = ` h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${className}`;

  const hasError = errors?.[name as Path<T>] || error;
  const errorMessage = 
    errors?.[name as Path<T>]?.message as string || 
    (typeof error === 'string' ? error : '');

  if (disabled) {
    inputClasses += ` text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 opacity-40`;
  } else if (hasError) {
    inputClasses += ` border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800`;
  } else if (success) {
    inputClasses += ` border-success-500 focus:border-success-300 focus:ring-success-500/20 dark:text-success-400 dark:border-success-500 dark:focus:border-success-800`;
  } else {
    inputClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800`;
  }

  const inputProps = register 
    ? { ...register(name as Path<T>, rules) }
    : { value, onChange, name };

  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={inputClasses}
        {...inputProps}
      />

      {(hint || hasError) && (
        <p
          className={`mt-1.5 text-xs ${
            hasError
              ? "text-error-500"
              : success
              ? "text-success-500"
              : "text-gray-500"
          }`}
        >
          {errorMessage || hint}
        </p>
      )}
    </div>
  );
};

export default Input;