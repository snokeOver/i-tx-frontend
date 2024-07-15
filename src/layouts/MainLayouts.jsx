import { Outlet } from "react-router-dom";

const MainLayouts = () => {
  return (
    <div>
      {/* Header component*/}
      <div className="min-h-[calc(100vh-560px)]">
        <Outlet />
      </div>
      {/* Footer component */}
    </div>
  );
};

export default MainLayouts;
