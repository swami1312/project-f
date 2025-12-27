import React from "react";

// StatusBadge Component - Displays order status with appropriate styling
const StatusBadge = ({ status }) => {
  const e = React.createElement;

  const getStatusStyle = (status) => {
    const styles = {
      Paid: "background-color: #dcfce7; color: #166534;",
      Delivered: "background-color: #ffedd5; color: #9a3412;",
      Completed: "background-color: #d1fae5; color: #065f46;",
      Pending: "background-color: #fef3c7; color: #92400e;",
      Cancelled: "background-color: #fee2e2; color: #991b1b;",
    };
    return styles[status] || styles["Pending"];
  };

  return e(
    "span",
    {
      className: "px-3 py-1 rounded-full text-xs font-medium",
      style: { cssText: getStatusStyle(status) },
    },
    status
  );
};

export default StatusBadge;
