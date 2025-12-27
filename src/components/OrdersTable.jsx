import React from "react";

// OrdersTable Component - Main orders table with selection
const OrdersTable = ({
  orders,
  selectedOrders,
  onSelectOrder,
  onSelectAll,
  onOrderClick,
}) => {
  const e = React.createElement;

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

  const isAllSelected =
    orders.length > 0 && selectedOrders.length === orders.length;

  return e(
    "div",
    { className: "bg-white rounded-xl shadow-sm overflow-hidden" },
    e(
      "table",
      { className: "w-full" },
      // Table Header
      e(
        "thead",
        null,
        e(
          "tr",
          { className: "border-b border-gray-100" },
          e(
            "th",
            { className: "px-6 py-4 text-left" },
            e(
              "label",
              { className: "relative inline-flex items-center cursor-pointer" },
              e("input", {
                type: "checkbox",
                className: "sr-only",
                checked: isAllSelected,
                onChange: (e) => onSelectAll(e.target.checked),
              }),
              e(
                "div",
                {
                  className: `w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    isAllSelected
                      ? "bg-gray-900 border-gray-900"
                      : "bg-white border-gray-300"
                  }`,
                },
                isAllSelected &&
                  e("i", { className: "fas fa-check text-white text-xs" })
              )
            )
          ),
          e(
            "th",
            {
              className:
                "px-6 py-4 text-left text-sm font-medium text-gray-500",
            },
            "Order"
          ),
          e(
            "th",
            {
              className:
                "px-6 py-4 text-left text-sm font-medium text-gray-500",
            },
            "Customer"
          ),
          e(
            "th",
            {
              className:
                "px-6 py-4 text-left text-sm font-medium text-gray-500",
            },
            "Status"
          ),
          e(
            "th",
            {
              className:
                "px-6 py-4 text-left text-sm font-medium text-gray-500",
            },
            "Total"
          ),
          e(
            "th",
            {
              className:
                "px-6 py-4 text-left text-sm font-medium text-gray-500",
            },
            "Date"
          ),
          e("th", { className: "px-6 py-4 text-left" })
        )
      ),

      // Table Body
      e(
        "tbody",
        null,
        orders.map((order) => {
          const isSelected = selectedOrders.includes(order.id);

          return e(
            "tr",
            {
              key: order.id,
              className: `border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${
                isSelected ? "bg-gray-50" : ""
              }`,
              onClick: (e) => {
                if (e.target.type !== "checkbox") {
                  onOrderClick(order);
                }
              },
            },
            // Checkbox
            e(
              "td",
              { className: "px-6 py-4" },
              e(
                "label",
                {
                  className: "relative inline-flex items-center cursor-pointer",
                  onClick: (e) => e.stopPropagation(),
                },
                e("input", {
                  type: "checkbox",
                  className: "sr-only",
                  checked: isSelected,
                  onChange: (e) => onSelectOrder(order.id, e.target.checked),
                }),
                e(
                  "div",
                  {
                    className: `w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-gray-900 border-gray-900"
                        : "bg-white border-gray-300 hover:border-gray-400"
                    }`,
                  },
                  isSelected &&
                    e("i", { className: "fas fa-check text-white text-xs" })
                )
              )
            ),

            // Order ID
            e(
              "td",
              { className: "px-6 py-4" },
              e(
                "span",
                { className: "text-sm font-medium text-gray-900" },
                `#${order.id}`
              )
            ),

            // Customer
            e(
              "td",
              { className: "px-6 py-4" },
              e(
                "div",
                { className: "flex items-center gap-3" },
                e("img", {
                  src: order.customer.avatar,
                  alt: order.customer.name,
                  className: "w-8 h-8 rounded-full object-cover",
                }),
                e(
                  "span",
                  { className: "text-sm text-gray-900" },
                  order.customer.name
                )
              )
            ),

            // Status
            e(
              "td",
              { className: "px-6 py-4" },
              e(
                "span",
                {
                  className: "px-3 py-1 rounded-full text-xs font-medium",
                  style: getStatusStyle(order.status),
                },
                order.status
              )
            ),

            // Total
            e(
              "td",
              { className: "px-6 py-4" },
              e(
                "span",
                { className: "text-sm text-gray-900" },
                formatCurrency(order.total)
              )
            ),

            // Date
            e(
              "td",
              { className: "px-6 py-4" },
              e("span", { className: "text-sm text-gray-500" }, order.date)
            ),

            // Actions
            e(
              "td",
              { className: "px-6 py-4" },
              e(
                "button",
                {
                  className:
                    "text-gray-400 hover:text-gray-600 transition-colors",
                  onClick: (e) => {
                    e.stopPropagation();
                    // Handle more actions
                  },
                },
                e("i", { className: "fas fa-ellipsis-h" })
              )
            )
          );
        })
      )
    )
  );
};

export default OrdersTable;
