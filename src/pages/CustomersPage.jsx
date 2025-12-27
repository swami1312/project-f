import { useState, useEffect } from "react";
import Header from "../layouts/Header";

// CustomersPage Component - Customer management page
const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);

  // Extract unique customers from orders
  useEffect(() => {
    const orders = window.AppData?.orders || [];
    const seen = new Set();
    const uniqueCustomers = [];

    orders.forEach((order) => {
      if (!seen.has(order.customer.email)) {
        seen.add(order.customer.email);

        const customerOrders = orders.filter(
          (o) => o.customer.email === order.customer.email
        );

        uniqueCustomers.push({
          ...order.customer,
          ordersCount: customerOrders.length,
          totalSpent: customerOrders.reduce((sum, o) => sum + o.total, 0),
          lastOrder: customerOrders[0]?.date,
        });
      }
    });

    setCustomers(uniqueCustomers);
  }, []);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);

  const totalOrders = customers.reduce((sum, c) => sum + c.ordersCount, 0);

  const avgOrderValue = customers.length > 0 ? totalRevenue / totalOrders : 0;

  return (
    <div>
      {/* Header */}
      <Header title="Customers" />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Customers */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <i className="fas fa-users text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900">
                {customers.length}
              </p>
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <i className="fas fa-dollar-sign text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(totalRevenue)}
              </p>
            </div>
          </div>
        </div>

        {/* Average Order Value */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <i className="fas fa-shopping-cart text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg. Order Value</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(avgOrderValue)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">All Customers</h2>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Customer
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Email
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Orders
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Total Spent
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Last Order
              </th>
              <th className="px-6 py-4" />
            </tr>
          </thead>

          <tbody>
            {customers.map((customer, index) => (
              <tr
                key={index}
                className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={customer.avatar}
                      alt={customer.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="font-medium text-gray-900">
                      {customer.name}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {customer.email}
                </td>

                <td className="px-6 py-4 text-sm text-gray-900">
                  {customer.ordersCount}
                </td>

                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {formatCurrency(customer.totalSpent)}
                </td>

                <td className="px-6 py-4 text-sm text-gray-500">
                  {customer.lastOrder}
                </td>

                <td className="px-6 py-4">
                  <button className="text-gray-400 hover:text-gray-600">
                    <i className="fas fa-ellipsis-h" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersPage;
