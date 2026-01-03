import Sidebar from "./Sidebar";
import { Bounce, ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import useRouteInformation from "../Hooks/useRouteInformation";
import { getClientStorage } from "../Utils/functions";

const AppLayout = (props) => {
  const { pathname, navigate } = useRouteInformation();
  const cs = JSON.parse(getClientStorage());
  if (["/login"].includes(pathname)) {
    return props.children;
  }
  if (!cs) {
    return navigate("/login");
  }

  return (
    <div className="flex min-h-screen bg-amber-50/30">
      <Sidebar />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        transition={Bounce}
      />
      <main className="flex-1 ml-52 p-8 width-100">{props.children}</main>
    </div>
  );
};

export default AppLayout;
