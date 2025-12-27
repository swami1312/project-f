import React from "react";

// Avatar Component - Displays user/customer avatar
const Avatar = ({ src, alt, size = "md", className = "" }) => {
  const e = React.createElement;

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16",
    xl: "w-20 h-20",
  };

  return e("img", {
    src: src || "https://i.pravatar.cc/150?img=1",
    alt: alt || "Avatar",
    className: `${sizeClasses[size]} rounded-full object-cover ${className}`,
    onError: (e) => {
      e.target.src = "https://i.pravatar.cc/150?img=1";
    },
  });
};

export default Avatar;
