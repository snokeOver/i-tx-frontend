import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/sidebar/Sidebar";
import Header from "../components/header/Header";

const AdminDashboardLayout = () => {
  return (
    <div>
      <Header />

      <Sidebar />

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
