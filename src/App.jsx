import { Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import RetailerOrders from "./pages/RetailerOrders/RetailerOrders";
import GenerateInvoice from "./pages/GenerateInvoice/GenerateInvoice";
import Inventory from "./pages/Inventory/Inventory";
import AdminProducts from "./pages/AdminProducts/AdminProducts";
import AdminProducts2 from "./pages/AdminProducts2/AdminProducts2";
import PlaceholderPage from "./pages/PlaceholderPage";
import AppLayout from "./layouts/AppLayout";
import useRouteInformation from "./Hooks/useRouteInformation";
import InventoryForm from "./pages/AdminProducts/InventoryForm";
import ViewInventoryForm from "./pages/AdminProducts2/ViewInventoryForm";

const App = () => {
  const { pathname } = useRouteInformation();
  return (
    <Routes>
      {/* Layout wrapper */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/inventory" />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/user-orders" element={<RetailerOrders />} />
        <Route path="/generate-invoice" element={<GenerateInvoice />} />
        <Route path="/user-inventory" element={<Inventory />} />
        <Route path="/admin/products-1" element={<AdminProducts />} />
        <Route
          path="/admin/products-1/add-inventory/:riID"
          element={<InventoryForm />}
        />
        <Route path="/admin/products-2" element={<AdminProducts2 />} />
        <Route
          path="/admin/products-2/View-inventory/:riID"
          element={<ViewInventoryForm />}
        />

        {/* Fallback */}
        <Route
          path="*"
          element={
            <PlaceholderPage
              title={pathname.slice(1).replace(/^./, (c) => c.toUpperCase())}
            />
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
