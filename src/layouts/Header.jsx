import React from "react";

// Header Layout Component - Page header with title and user info
const Header = ({ title, user }) => {
  const e = React.createElement;

  const defaultUser = {
    name: "Manohar",
    email: "Manohar@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=32",
  };

  const currentUser = user || defaultUser;

  return e(
    "header",
    {
      className: "flex items-center justify-between mb-8",
    },
    // Page Title
    e(
      "h1",
      {
        className: "text-2xl font-bold text-gray-900 capitalize",
      },
      title
    ),

    // Right Side - Actions & User
    e(
      "div",
      { className: "flex items-center gap-4" },
      // Email Icon
      // e(
      //   "button",
      //   {
      //     className:
      //       "w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors",
      //   },
      //   e("i", { className: "far fa-envelope" })
      // ),

      // Search Icon
      // e(
      //   "button",
      //   {
      //     className:
      //       "w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors",
      //   },
      //   e("i", { className: "fas fa-search" })
      // ),

      // User Info
      e(
        "div",
        { className: "flex items-center gap-3 pl-4 border-l border-gray-200" },
        e("img", {
          src: currentUser.avatar,
          alt: currentUser.name,
          className: "w-10 h-10 rounded-full object-cover",
        }),
        e(
          "div",
          { className: "hidden sm:block" },
          e(
            "p",
            {
              className: "text-sm font-medium text-gray-900",
            },
            currentUser.name
          ),
          e(
            "p",
            {
              className: "text-xs text-gray-500",
            },
            currentUser.email
          )
        )
      )
    )
  );
};

export default Header;
