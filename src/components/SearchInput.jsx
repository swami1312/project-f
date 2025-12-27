import React from "react";

// SearchInput Component - Search input with icon
const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) => {
  const e = React.createElement;

  return e(
    "div",
    {
      className: `relative ${className}`,
    },
    e("input", {
      type: "text",
      value: value,
      onChange: (e) => onChange(e.target.value),
      placeholder: placeholder,
      className:
        "w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent",
    }),
    e("i", {
      className:
        "fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400",
    })
  );
};

export default SearchInput;
