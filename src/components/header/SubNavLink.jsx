import { NavLink } from "react-router-dom";

const SubNavLink = ({ destination, name, badgeValue }) => {
  return (
    <li>
      <NavLink
        to={destination}
        className={({ isActive }) =>
          `${
            isActive
              ? "text-primary border-b border-primary"
              : "hover:text-primary "
          } w-full justify-between`
        }
      >
        {name} {badgeValue && <span className="badge">{badgeValue}</span>}
      </NavLink>
    </li>
  );
};

export default SubNavLink;
