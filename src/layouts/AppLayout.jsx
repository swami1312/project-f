import Sidebar from "./Sidebar";
import { Bounce, ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex min-h-screen bg-amber-50/30">
      <Sidebar />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        transition={Bounce}
      />

      <main className="flex-1 ml-52 p-8 width-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
