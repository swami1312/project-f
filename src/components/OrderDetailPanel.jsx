import React from "react";

// OrderDetailPanel Component - Right panel showing selected order details
const OrderDetailPanel = ({ order, onClose }) => {
  const e = React.createElement;

  if (!order) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStatusStyle = (status) => {
    const styles = {
      Paid: { backgroundColor: "#dcfce7", color: "#166534" },
      Delivered: { backgroundColor: "#ffedd5", color: "#9a3412" },
      Completed: { backgroundColor: "#d1fae5", color: "#065f46" },
    };
    return styles[status] || styles["Paid"];
  };

  return e(
    "div",
    {
      className: "w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto",
    },
    // Header
    e(
      "div",
      { className: "flex items-center justify-between mb-6" },
      e(
        "h2",
        { className: "text-lg font-semibold text-gray-900" },
        `Order #${order.id}`
      ),
      e(
        "button",
        {
          onClick: onClose,
          className: "text-gray-400 hover:text-gray-600 transition-colors",
        },
        e("i", { className: "fas fa-times text-xl" })
      )
    ),

    // Status and Date
    e(
      "div",
      { className: "flex items-center gap-3 mb-6" },
      e(
        "span",
        {
          className: "px-3 py-1 rounded-full text-xs font-medium",
          style: getStatusStyle(order.status),
        },
        order.status
      ),
      e("span", { className: "text-sm text-gray-500" }, order.date)
    ),

    // Customer Info
    e(
      "div",
      { className: "text-center mb-6" },
      e("img", {
        src: order.customer.avatar,
        alt: order.customer.name,
        className: "w-20 h-20 rounded-full mx-auto mb-3 object-cover",
      }),
      e(
        "h3",
        { className: "font-semibold text-gray-900" },
        order.customer.name
      ),

      // Contact buttons
      e(
        "div",
        { className: "flex justify-center gap-3 mt-3" },
        e(
          "button",
          {
            className:
              "w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-gray-800 transition-colors",
          },
          e("i", { className: "fas fa-envelope text-sm" })
        ),
        e(
          "button",
          {
            className:
              "w-10 h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200 transition-colors",
          },
          e("i", { className: "fas fa-phone text-sm" })
        ),
        e(
          "button",
          {
            className:
              "w-10 h-10 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-gray-200 transition-colors",
          },
          e("i", { className: "fab fa-whatsapp text-sm" })
        )
      )
    ),

    // Order Items
    e(
      "div",
      { className: "mb-6" },
      e(
        "h4",
        { className: "text-sm font-semibold text-gray-900 mb-4" },
        "Order items"
      ),
      e(
        "div",
        { className: "space-y-4" },
        order.items.map((item, index) =>
          e(
            "div",
            {
              key: index,
              className: "flex items-center gap-3",
            },
            e("img", {
              src: item.image,
              alt: item.name,
              className: "w-12 h-12 rounded-lg object-cover bg-gray-100",
            }),
            e(
              "div",
              { className: "flex-1 min-w-0" },
              e(
                "p",
                {
                  className: "text-sm font-medium text-gray-900 truncate",
                },
                item.name
              ),
              e(
                "p",
                {
                  className: "text-sm font-semibold text-gray-900",
                },
                formatCurrency(item.price)
              )
            )
          )
        )
      )
    ),

    // Total
    e(
      "div",
      {
        className:
          "flex justify-between items-center py-4 border-t border-gray-200 mb-6",
      },
      e("span", { className: "text-gray-500" }, "Total"),
      e(
        "span",
        { className: "text-xl font-bold text-gray-900" },
        formatCurrency(order.total)
      )
    ),

    // Action Buttons
    e(
      "div",
      { className: "flex gap-3" },
      e(
        "button",
        {
          className:
            "flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors",
        },
        e("span", null, "Track"),
        e("i", { className: "fas fa-location-arrow text-sm" })
      ),
      e(
        "button",
        {
          className:
            "flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-amber-400 text-gray-900 rounded-lg font-medium hover:bg-amber-500 transition-colors",
        },
        e("span", null, "Refund"),
        e("i", { className: "fas fa-undo text-sm" })
      )
    )
  );
};

export default OrderDetailPanel;
