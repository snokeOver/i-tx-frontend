import { useEffect, useState } from "react";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import UserMenus from "./UserMenus";
import ProUserMenus from "./ProUserMenus";
import SurveyorMenus from "./SurveyorMenus";
import AdminMenus from "./AdminMenus";
import UserToggleButton from "../shared/UserToggleButton";
import useData from "../../../hooks/useData";

const Sidebar = () => {
  const [isActive, setActive] = useState(false);
  const { userDetails } = useAuth();
  const { toggle, setToggle } = useData();
  const userRole = userDetails?.userRole;

  const navigate = useNavigate();

  const handleToggle = () => {
    setActive(!isActive);
  };

  const toggleHandler = (e) => {
    setToggle(e.target.checked);
  };

  // Condition for User and try to hit the Surveyor button
  useEffect(() => {
    if (userRole === "User") {
      navigate(toggle ? "/dashboard/request" : "/dashboard");
    } else if (userRole === "Agent") {
      navigate(toggle ? "/dashboard/agent" : "/dashboard");
    } else if (userRole === "Admin") {
      navigate("/dashboard/admin");
    } else {
      navigate("/dashboard");
    }
  }, [toggle, userRole]);

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-base-100 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold"></div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-primary"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-base-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform top-[7.3rem] md:top-[4rem] ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {/* Conditional toggle button here.. */}
            {userRole !== "Admin" && (
              <UserToggleButton toggleHandler={toggleHandler} toggle={toggle} />
            )}
            {/*  Menu Items */}
            <nav>
              {/*  User only access the User Menu and link to send request to become Surveyor */}
              {userRole === "User" && (toggle ? null : <UserMenus />)}

              {/* Surveyor can toggle between User to Surveyor */}
              {userRole === "Surveyor" &&
                (toggle ? <SurveyorMenus /> : <UserMenus />)}

              {/* for admin only */}
              {userRole === "Admin" && <AdminMenus />}
            </nav>
          </div>
        </div>

        <div>
          <div className="divider"></div>

          {/* Profile Menu */}
          <NavLink
            to="/user-profile"
            className={({ isActive }) =>
              `flex items-center  py-2 my-5  transition-colors duration-300 transform  hover:bg-primary   hover:text-gray-900 w-full  ${
                isActive
                  ? "bg-primary  text-gray-800"
                  : "dark:text-gray-100 text-gray-900"
              }`
            }
          >
            <div className="flex justify-between w-full">
              <div className="mx-4 font-medium flex items-center gap-2 text-left ">
                <FcSettings className="w-5 h-5" />
                Profile
              </div>
              <div className="mx-4 font-medium text-end text-sky-600 border-sky-600 border px-3 rounded-xl">
                {userRole}
              </div>
            </div>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
