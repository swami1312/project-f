import React from "react";

// IconButton Component - Circular icon button
const IconButton = ({
  icon,
  onClick,
  variant = "default",
  size = "md",
  className = "",
  title = "",
}) => {
  const e = React.createElement;

  const variants = {
    default: "text-gray-600 hover:bg-gray-100",
    primary: "bg-gray-900 text-white hover:bg-gray-800",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    accent: "bg-amber-100 text-amber-700 hover:bg-amber-200",
    ghost: "text-gray-400 hover:text-gray-600 hover:bg-gray-50",
  };

  const sizes = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
  };

  return e(
    "button",
    {
      type: "button",
      onClick,
      title,
      className: `inline-flex items-center justify-center rounded-full transition-colors focus:outline-none ${variants[variant]} ${sizes[size]} ${className}`,
    },
    e("i", { className: `fas ${icon}` })
  );
};

export default IconButton;
