import React from "react";

// MetricCard Component - Displays dashboard metric with icon
const MetricCard = ({ title, value, icon, color = "bg-blue-500" }) => {
  const e = React.createElement;

  return e(
    "div",
    {
      className:
        "bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200",
    },
    e(
      "div",
      { className: "flex items-center justify-between" },
      e(
        "div",
        null,
        e(
          "p",
          {
            className: "text-sm text-gray-500 mb-1 font-medium",
          },
          title
        ),
        e(
          "p",
          {
            className: "text-2xl font-bold text-gray-900",
          },
          value
        )
      ),
      e(
        "div",
        {
          className: `w-12 h-12 ${color} rounded-xl flex items-center justify-center shadow-sm`,
        },
        e("i", { className: `fas ${icon} text-white text-lg` })
      )
    )
  );
};

export default MetricCard;
