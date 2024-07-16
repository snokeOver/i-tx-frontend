import DynamicNavLinks from "./DynamicNavLinks";
import { BsGraphUp } from "react-icons/bs";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdOutlineManageAccounts } from "react-icons/md";

const AdminMenus = () => {
  return (
    <>
      {/* Statistics */}
      <DynamicNavLinks
        address="/dashboard/admin"
        name="Admin Statistics"
        icon={BsGraphUp}
      />

      {/* Manage users */}
      <DynamicNavLinks
        address="/dashboard/admin/manage-users"
        name="Manage Users"
        icon={MdOutlineManageAccounts}
      />

      {/* Monitor Transactions */}
      <DynamicNavLinks
        address="/dashboard/admin/monitor-tx"
        name="Monitor All Tx"
        icon={GiTakeMyMoney}
      />
    </>
  );
};

export default AdminMenus;
