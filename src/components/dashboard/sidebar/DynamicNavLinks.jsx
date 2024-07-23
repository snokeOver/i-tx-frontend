import { NavLink } from "react-router-dom";

const DynamicNavLinks = ({ address, name, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex flex-col gap-2 lg:flex-row items-center text-center py-2 lg:px-4 my-5 transition-colors duration-300 transform  hover:bg-primary hover:text-gray-900 rounded-sm ${
          isActive
            ? "dark:bg-yellow-200 bg-sky-300  text-gray-800"
            : "dark:text-gray-100 text-gray-900"
        }`
      }
    >
      <Icon className="w-5 h-5" />

      <span className="mx-4 text-[11px] md:text-base md:font-medium">
        {name}
      </span>
    </NavLink>
  );
};

export default DynamicNavLinks;
