import { useState } from "react";
import Sidebar from "./layouts/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import OrdersPage from "./pages/OrdersPage";
import CustomersPage from "./pages/CustomersPage";
import PlaceholderPage from "./pages/PlaceholderPage";
import GenerateInvoice from "./pages/GenerateInvoice/GenerateInvoice";
import Inventory from "./pages/Inventory/Inventory";
import AdminProducts from "./pages/AdminProducts/AdminProducts";
import RetailerOrders from "./pages/RetailerOrders/RetailerOrders";

const App = () => {
  const [activePage, setActivePage] = useState("inventory");

  return (
    <div className="flex min-h-screen bg-amber-50/30">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main className="flex-1 ml-52 p-8">
        {/* {activePage === "dashboard" && <DashboardPage />} */}
        {activePage === "user-orders" && <RetailerOrders />}
        {/* {activePage === "customers" && <CustomersPage />} */}
        {activePage === "generate-invoice" && <GenerateInvoice />}
        {activePage === "admin-1" && <AdminProducts />}
        {activePage === "user-inventory" && <Inventory />}
        {![
          "user-orders",
          "generate-invoice",
          "user-inventory",
          "admin-1",
        ].includes(activePage) && <PlaceholderPage title={activePage} />}
      </main>
    </div>
  );
};

export default App;
