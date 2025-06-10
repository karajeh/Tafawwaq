"use client";
import React, { ReactNode } from "react";

interface InputFieldProps {
  label?: string | ReactNode;
  type:
    | "text"
    | "password"
    | "email"
    | "number"
    | "tel"
    | "url"
    | "search"
    | "date"
    | "datetime-local"
    | "month"
    | "week"
    | "time"
    | "color";
  placeholder: string;
  id: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  labelClasses?: string; // Tailwind CSS classes for the label
  labelStyle?: React.CSSProperties; // Custom inline styles for the label
  max?: number;
  min?: number;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  placeholder,
  id,
  value,
  onChange,
  required = false,
  disabled = false,
  readOnly = false,
  className = "",
  labelClasses = "",
  max,
  min,
  labelStyle = {}, // Default to an empty object
}) => {
  return (
    <div className="mb-3">
      <label
        htmlFor={id}
        style={labelStyle} // Apply custom styles
        className={`mb-1 block text-sm text-[#1A1A1A] ${labelClasses}`}
      >
        {label}
        {required && <span className="text-red-500 font-semibold">*</span>}
      </label>
      <input
        maxLength={max ?? undefined}
        minLength={min ?? undefined}
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        className={`w-full px-3 py-3 border border-light_gray rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-black  placeholder-gray-600 ${className}`}
      />
    </div>
  );
};

export default InputField;
