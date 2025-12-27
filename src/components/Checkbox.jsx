import React from "react";

// Checkbox Component - Custom styled checkbox
const Checkbox = ({ checked, onChange, className = "" }) => {
  const e = React.createElement;

  return e(
    "label",
    {
      className: `relative inline-flex items-center cursor-pointer ${className}`,
    },
    e("input", {
      type: "checkbox",
      className: "sr-only",
      checked: checked,
      onChange: (e) => onChange(e.target.checked),
    }),
    e(
      "div",
      {
        className: `w-5 h-5 rounded border-2 flex items-center justify-center transition-colors
                ${
                  checked
                    ? "bg-gray-900 border-gray-900"
                    : "bg-white border-gray-300 hover:border-gray-400"
                }`,
      },
      checked &&
        e("i", {
          className: "fas fa-check text-white text-xs",
        })
    )
  );
};

export default Checkbox;
