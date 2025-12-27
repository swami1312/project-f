// Navigation Data - Menu items for sidebar
const navigationData = [
  { id: "dashboard", label: "Dashboard", icon: "fa-th-large", path: "/" },
  { id: "orders", label: "Orders", icon: "fa-shopping-bag", path: "/orders" },
  {
    id: "payments",
    label: "Payments",
    icon: "fa-credit-card",
    path: "/payments",
  },
  { id: "customers", label: "Customers", icon: "fa-users", path: "/customers" },
  { id: "reports", label: "Reports", icon: "fa-chart-bar", path: "/reports" },
  {
    id: "statistic",
    label: "Statistic",
    icon: "fa-chart-pie",
    path: "/statistic",
  },
  {
    id: "notification",
    label: "Notification",
    icon: "fa-bell",
    path: "/notification",
  },
  { id: "help", label: "Help", icon: "fa-question-circle", path: "/help" },
  { id: "settings", label: "Settings", icon: "fa-cog", path: "/settings" },
];

const NavigationData = {
  items: navigationData,
  getItemById: (id) => navigationData.find((item) => item.id === id),
  getMainNavItems: () => navigationData.slice(0, 6),
  getSecondaryNavItems: () => navigationData.slice(6),
};

export default NavigationData;
