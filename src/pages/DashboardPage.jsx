import { useState, useEffect } from "react";
import Header from "../layouts/Header";

// DashboardPage Component - Main dashboard with metrics and overview
const DashboardPage = () => {
  const [metrics, setMetrics] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    paidOrders: 0,
    completedOrders: 0,
    deliveredOrders: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const orders = window.AppData?.orders || [];

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const paidOrders = orders.filter((o) => o.status === "Paid").length;
    const completedOrders = orders.filter(
      (o) => o.status === "Completed"
    ).length;
    const deliveredOrders = orders.filter(
      (o) => o.status === "Delivered"
    ).length;

    setMetrics({
      totalOrders,
      totalRevenue,
      paidOrders,
      completedOrders,
      deliveredOrders,
    });

    setRecentOrders(orders.slice(0, 5));
  }, []);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  const getStatusStyle = (status) =>
    ({
      Paid: { backgroundColor: "#dcfce7", color: "#166534" },
      Delivered: { backgroundColor: "#ffedd5", color: "#9a3412" },
      Completed: { backgroundColor: "#d1fae5", color: "#065f46" },
    }[status]);

  const MetricCard = ({ title, value, icon, color }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1 font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div
          className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}
        >
          <i className={`fas ${icon} text-white text-lg`} />
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* Header */}
      <Header title="Dashboard" />

      {/* Metrics */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Orders"
          value={metrics.totalOrders}
          icon="fa-shopping-bag"
          color="bg-blue-500"
        />
        <MetricCard
          title="Total Revenue"
          value={formatCurrency(metrics.totalRevenue)}
          icon="fa-dollar-sign"
          color="bg-green-500"
        />
        <MetricCard
          title="Paid Orders"
          value={metrics.paidOrders}
          icon="fa-credit-card"
          color="bg-amber-500"
        />
        <MetricCard
          title="Completed"
          value={metrics.completedOrders}
          icon="fa-check-circle"
          color="bg-purple-500"
        />
      </div> */}

      {/* Content */}
      {
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          {/* <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between mb-6">
              <h2 className="text-lg font-semibold">Recent Orders</h2>
              <button className="text-sm text-amber-600 font-medium">
                View all
              </button>
            </div>

            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex justify-between py-3 border-b last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={order.customer.avatar}
                      alt={order.customer.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium">
                        {order.customer.name}
                      </p>
                      <p className="text-xs text-gray-500">#{order.id}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {formatCurrency(order.total)}
                    </p>
                    <span
                      className="inline-block px-2 py-0.5 rounded-full text-xs mt-1"
                      style={getStatusStyle(order.status)}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          {/* Order Status Overview */}
          {/* <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6">
              Order Status Overview
            </h2>

            {[
              ["Paid", metrics.paidOrders, "bg-green-500"],
              ["Delivered", metrics.deliveredOrders, "bg-orange-500"],
              ["Completed", metrics.completedOrders, "bg-purple-500"],
            ].map(([label, value, color]) => (
              <div key={label} className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">{label}</span>
                  <span className="text-sm font-medium">{value} orders</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${color}`}
                    style={{
                      width: `${
                        metrics.totalOrders
                          ? (value / metrics.totalOrders) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            ))}

            <div className="mt-8 pt-6 border-t grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">{metrics.totalOrders}</p>
                <p className="text-xs text-gray-500">Total Orders</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(metrics.totalRevenue)}
                </p>
                <p className="text-xs text-gray-500">Total Revenue</p>
              </div>
            </div>
          </div> */}
        </div>
      }
    </div>
  );
};

export default DashboardPage;
