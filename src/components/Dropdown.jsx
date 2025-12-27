import React from "react";

// Dropdown Component - Filterable select dropdown
const Dropdown = ({
  options,
  value,
  onChange,
  icon = null,
  className = "",
}) => {
  const e = React.createElement;
  const { useState, useRef, useEffect } = React;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return e(
    "div",
    {
      ref: dropdownRef,
      className: `relative ${className}`,
    },
    // Trigger button
    e(
      "button",
      {
        type: "button",
        className:
          "flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors",
        onClick: () => setIsOpen(!isOpen),
      },
      icon && e("i", { className: `fas ${icon} text-gray-400` }),
      e("span", null, value),
      e("i", {
        className: `fas fa-chevron-down text-gray-400 ml-2 text-xs transition-transform ${
          isOpen ? "rotate-180" : ""
        }`,
      })
    ),

    // Dropdown menu
    isOpen &&
      e(
        "div",
        {
          className:
            "absolute top-full left-0 mt-1 w-full min-w-[150px] bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1",
        },
        options.map((option, index) =>
          e(
            "button",
            {
              key: index,
              type: "button",
              className: `w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                option === value ? "bg-gray-100 font-medium" : "text-gray-700"
              }`,
              onClick: () => handleSelect(option),
            },
            option
          )
        )
      )
  );
};

export default Dropdown;
