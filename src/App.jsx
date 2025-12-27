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
import { Bounce, ToastContainer } from "react-toastify";
import AdminProducts2 from "./pages/AdminProducts2/AdminProducts2";

const App = () => {
  const [activePage, setActivePage] = useState("inventory");

  return (
    <div className="flex min-h-screen bg-amber-50/30">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <main className="flex-1 ml-52 p-8">
        {/* {activePage === "dashboard" && <DashboardPage />} */}
        {activePage === "user-orders" && <RetailerOrders />}
        {/* {activePage === "customers" && <CustomersPage />} */}
        {activePage === "generate-invoice" && <GenerateInvoice />}
        {activePage === "admin-1" && <AdminProducts />}
        {activePage === "admin-2" && <AdminProducts2 />}
        {activePage === "user-inventory" && <Inventory />}
        {![
          "user-orders",
          "generate-invoice",
          "user-inventory",
          "admin-1",
          "admin-2",
        ].includes(activePage) && <PlaceholderPage title={activePage} />}
      </main>
    </div>
  );
};

export default App;
