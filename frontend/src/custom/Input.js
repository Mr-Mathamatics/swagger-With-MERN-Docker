import React from "react";


export const CustomButton = ({ onClick, children, className, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-500 text-white px-4 py-2 rounded-md ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const CustomInput = ({
  type,
  placeholder,
  name,
  value,
  onChange,
  className,
  ...props
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className={`border border-gray-300 rounded-md px-4 py-2 ${className}`}
      {...props}
    />
  );
};