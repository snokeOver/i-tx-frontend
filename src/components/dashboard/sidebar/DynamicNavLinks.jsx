import { NavLink } from "react-router-dom";

const DynamicNavLinks = ({ address, name, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-primary hover:text-gray-900 rounded-sm ${
          isActive
            ? "dark:bg-yellow-200 bg-sky-300  text-gray-800"
            : "dark:text-gray-100 text-gray-900"
        }`
      }
    >
      <Icon className="w-5 h-5" />

      <span className="mx-4 font-medium">{name}</span>
    </NavLink>
  );
};

export default DynamicNavLinks;
