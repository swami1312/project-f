import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Sidebar Layout Component - Main navigation sidebar
const Sidebar = () => {
  const e = React.createElement;
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const mainNavItems = [
    {
      id: "/generate-invoice",
      label: "Generate Invoice",
      icon: "fa-light fa-file-invoice",
    },
    { id: "/user-inventory", label: "User Inventory", icon: "fa-th-large" },
    { id: "/user-orders", label: "User Orders", icon: "fa-shopping-bag" },
    { id: "/admin/products-1", label: "Admin 1", icon: "fa-person" },
    { id: "/admin/products-2", label: "Admin 2", icon: "fa-person" },
    { id: "/dashboard", label: "Dashboard", icon: "fa-th-large" },
    { id: "/payments", label: "Payments", icon: "fa-credit-card" },
    { id: "/customers", label: "Customers", icon: "fa-users" },
    // { id: "/statistic", label: "Statistic", icon: "fa-chart-pie" },
  ];

  const secondaryNavItems = [
    { id: "/notification", label: "Notification", icon: "fa-bell" },
    { id: "/settings", label: "Settings", icon: "fa-cog" },
  ];

  const NavItem = ({ item }) => {
    const isActive = pathname === item.id;

    return e(
      "button",
      {
        onClick: () => navigate(item.id),
        className: `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
          isActive
            ? "bg-amber-400/90 text-gray-900"
            : "text-gray-400 hover:text-white hover:bg-white/5"
        }`,
      },
      e("i", {
        className: `fas ${item.icon} w-5 text-center ${
          isActive ? "text-gray-900" : ""
        }`,
      }),
      e(
        "span",
        {
          className: `text-sm font-medium ${isActive ? "text-gray-900" : ""}`,
        },
        item.label
      )
    );
  };

  return e(
    "aside",
    {
      className:
        "fixed left-0 top-0 bottom-0 w-52 bg-gray-900 flex flex-col z-50",
    },

    // Logo
    e(
      "div",
      { className: "px-4 py-6" },
      e(
        "div",
        { className: "flex items-center gap-2" },
        e(
          "div",
          {
            className:
              "w-8 h-8 bg-white rounded-lg flex items-center justify-center",
          },
          e("i", { className: "fas fa-chart-line text-gray-900 text-sm" })
        ),
        e(
          "span",
          { className: "text-white font-semibold text-lg" },
          "ProfitPulse"
        )
      )
    ),

    // Main Navigation
    e(
      "nav",
      { className: "flex-1 px-3 py-2" },
      e(
        "div",
        { className: "space-y-1" },
        mainNavItems.map((item) => e(NavItem, { key: item.id, item }))
      ),

      e("div", { className: "my-6 border-t border-gray-800" }),

      // Secondary Navigation
      e(
        "div",
        { className: "space-y-1" },
        secondaryNavItems.map((item) => e(NavItem, { key: item.id, item }))
      )
    ),

    // Logout
    e(
      "div",
      { className: "px-3 py-4 border-t border-gray-800" },
      e(
        "button",
        {
          className:
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-left",
        },
        e("i", { className: "fas fa-sign-out-alt w-5 text-center" }),
        e("span", { className: "text-sm font-medium" }, "Log out")
      )
    )
  );
};

export default Sidebar;
