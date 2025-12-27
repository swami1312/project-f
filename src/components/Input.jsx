import React from "react";

// Input Component - Normal reusable input
const Input = ({
  type = "text",
  value,
  onChange,
  placeholder = "",
  className = "",
  name,
}) => {
  const e = React.createElement;

  return e("input", {
    type,
    name,
    value,
    onChange: (e) => onChange(e.target.value),
    placeholder,
    className: `
      w-full px-4 py-2
      bg-white
      border border-gray-200
      rounded-lg
      text-sm
      focus:outline-none
      focus:ring-2
      focus:ring-gray-300
      focus:border-transparent
      ${className}
    `,
  });
};

export default Input;
