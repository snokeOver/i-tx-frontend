import DynamicNavLinks from "./DynamicNavLinks";
import { BsGraphUp } from "react-icons/bs";
import { LuHistory } from "react-icons/lu";
import { MdOutlinePending } from "react-icons/md";

const AgentMenus = () => {
  return (
    <>
      {/* Statistics */}
      <DynamicNavLinks
        address="/dashboard/agent"
        name="Dashboard"
        icon={BsGraphUp}
      />

      {/* Pending transactions like cash out and cash In */}
      <DynamicNavLinks
        address="/dashboard/agent/pending-tx"
        name="Pending Tx"
        icon={MdOutlinePending}
      />

      {/* Admin Feedbacks */}
      <DynamicNavLinks
        address="/dashboard/agent/tx-history"
        name="Transactions"
        icon={LuHistory}
      />
    </>
  );
};

export default AgentMenus;
