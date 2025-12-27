import React from "react";

// Button Component - Reusable button with variants
const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  icon = null,
  iconPosition = "left",
  className = "",
  disabled = false,
  type = "button",
}) => {
  const e = React.createElement;

  const variants = {
    primary: "bg-gray-900 text-white hover:bg-gray-800",
    secondary: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50",
    accent: "bg-amber-400 text-gray-900 hover:bg-amber-500",
    danger: "bg-red-500 text-white hover:bg-red-600",
    ghost: "text-gray-600 hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed";

  return e(
    "button",
    {
      type,
      onClick,
      disabled,
      className: `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`,
    },
    icon && iconPosition === "left" && e("i", { className: `fas ${icon}` }),
    children,
    icon && iconPosition === "right" && e("i", { className: `fas ${icon}` })
  );
};

export default Button;
