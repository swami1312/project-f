import { useState } from "react";
import Sidebar from "./layouts/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import OrdersPage from "./pages/OrdersPage";
import CustomersPage from "./pages/CustomersPage";
import PlaceholderPage from "./pages/PlaceholderPage";
import GenerateInvoice from "./pages/GenerateInvoice/GenerateInvoice";
import Inventory from "./pages/Inventory/Inventory";

const App = () => {
  const [activePage, setActivePage] = useState("inventory");

  return (
    <div className="flex min-h-screen bg-amber-50/30">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main className="flex-1 ml-52 p-8">
        {/* {activePage === "dashboard" && <DashboardPage />} */}
        {activePage === "orders" && <OrdersPage />}
        {/* {activePage === "customers" && <CustomersPage />} */}
        {activePage === "generate-invoice" && <GenerateInvoice />}
        {activePage === "inventory" && <Inventory />}
        {!["orders", "generate-invoice", "inventory"].includes(activePage) && (
          <PlaceholderPage title={activePage} />
        )}
      </main>
    </div>
  );
};

export default App;
