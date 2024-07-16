import { NavLink, useLocation } from "react-router-dom";

const NavigationLink = ({ destination, name, nested }) => {
  const { pathname } = useLocation();
  return (
    <li className="relative">
      <NavLink
        className={({ isActive }) =>
          `${
            isActive
              ? nested === "true"
                ? "text-primary"
                : "text-prime"
              : nested === "true"
              ? "hover:text-primary"
              : "hover:text-prime"
          } mr-1`
        }
        to={`${destination}`}
      >
        {name}
      </NavLink>
      {pathname === destination ? (
        <div
          className={`absolute w-full h-[1px]  py-0 rounded-none  bottom-0  ${
            nested === "true"
              ? "lg:h-[1.3px] lg:-bottom-[0px] bg-primary"
              : "bg-prime"
          }`}
        ></div>
      ) : null}
    </li>
  );
};

export default NavigationLink;
