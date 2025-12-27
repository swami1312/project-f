import { useState, useEffect, useMemo, useRef } from "react";
import Header from "../layouts/Header";
import OrderDetailPanel from "../components/OrderDetailPanel";
import OrdersData from "../data/orders";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState("Any status");
  const [priceFilter, setPriceFilter] = useState("$100—$1500");
  const [sortBy, setSortBy] = useState("Sort by Date");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // const ordersData = window.AppData?.orders || [];
    const ordersData = OrdersData.orders;

    setOrders(ordersData);

    if (ordersData.length > 0) {
      setSelectedOrder(
        ordersData.find((o) => o.id === "602992") || ordersData[0]
      );
    }
  }, []);

  const statusOptions = ["Any status", "Paid", "Delivered", "Completed"];
  const priceOptions = [
    "All prices",
    "$0—$100",
    "$100—$500",
    "$500—$1000",
    "$100—$1500",
    "$1000—$2000",
    "$2000+",
  ];
  const sortOptions = [
    "Sort by Date",
    "Date (Newest)",
    "Date (Oldest)",
    "Amount (High)",
    "Amount (Low)",
    "Customer (A-Z)",
  ];

  const filteredOrders = useMemo(() => {
    let result = [...orders];

    if (statusFilter !== "Any status") {
      result = result.filter((o) => o.status === statusFilter);
    }

    if (priceFilter !== "All prices") {
      const ranges = {
        "$0—$100": [0, 100],
        "$100—$500": [100, 500],
        "$500—$1000": [500, 1000],
        "$100—$1500": [100, 1500],
        "$1000—$2000": [1000, 2000],
        "$2000+": [2000, Infinity],
      };
      const [min, max] = ranges[priceFilter];
      result = result.filter((o) => o.total >= min && o.total <= max);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.customer.name.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case "Date (Newest)":
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "Date (Oldest)":
        result.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "Amount (High)":
        result.sort((a, b) => b.total - a.total);
        break;
      case "Amount (Low)":
        result.sort((a, b) => a.total - b.total);
        break;
      case "Customer (A-Z)":
        result.sort((a, b) => a.customer.name.localeCompare(b.customer.name));
        break;
      default:
        break;
    }

    return result;
  }, [orders, statusFilter, priceFilter, sortBy, searchQuery]);

  const Dropdown = ({ options, value, onChange }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
      const handler = (e) =>
        ref.current && !ref.current.contains(e.target) && setOpen(false);
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg text-sm"
        >
          {value}
          <i
            className={`fas fa-chevron-down text-xs ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <div className="absolute z-50 mt-1 bg-white border rounded-lg shadow">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className="block w-full px-4 py-2 text-left hover:bg-gray-50"
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-full">
      <div className="flex-1">
        <Header title="Orders" />

        <div className="flex justify-between mb-6">
          <div className="flex gap-3">
            <Dropdown
              options={statusOptions}
              value={statusFilter}
              onChange={setStatusFilter}
            />
            <Dropdown
              options={priceOptions}
              value={priceFilter}
              onChange={setPriceFilter}
            />
          </div>

          <Dropdown options={sortOptions} value={sortBy} onChange={setSortBy} />
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-6 py-4">#{order.id}</td>
                  <td className="px-6 py-4">{order.customer.name}</td>
                  <td className="px-6 py-4">{order.status}</td>
                  <td className="px-6 py-4">${order.total}</td>
                  <td className="px-6 py-4">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedOrder && (
        <OrderDetailPanel
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default OrdersPage;
