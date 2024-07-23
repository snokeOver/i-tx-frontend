import { FcSettings } from "react-icons/fc";
import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import UserMenus from "./UserMenus";

import AdminMenus from "./AdminMenus";
import AgentMenus from "./AgentMenus";

const Sidebar = () => {
  const { userDetails } = useAuth();

  const userRole = userDetails?.userRole;

  return (
    <>
      <div className="bg-base-100 w-full">
        <div className="flex justify-around w-full">
          {/*  User only access the User Menu and link to send request to become Surveyor */}
          {userRole === "User" && <UserMenus />}

          {/* Surveyor can toggle between User to Surveyor */}
          {userRole === "Agent" && <AgentMenus />}

          {/* for admin only */}
          {userRole === "Admin" && <AdminMenus />}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
