import React from "react";

// MainLayout Component - Wraps pages with sidebar and common layout
const MainLayout = ({ children, activePage, onNavigate }) => {
  const e = React.createElement;

  return e(
    "div",
    {
      className: "flex min-h-screen bg-amber-50/30",
    },
    // Sidebar
    e(window.AppComponents.Sidebar, { activePage, onNavigate }),

    // Main Content Area
    e(
      "main",
      {
        className: "flex-1 ml-52 p-8",
      },
      children
    )
  );
};

export default MainLayout;
