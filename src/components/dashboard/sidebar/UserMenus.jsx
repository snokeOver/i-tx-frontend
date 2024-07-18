import DynamicNavLinks from "./DynamicNavLinks";
import { BsGraphUp } from "react-icons/bs";

import { LuHistory } from "react-icons/lu";
import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

const UserMenus = () => {
  return (
    <>
      {/* Statistics */}
      <DynamicNavLinks address="/dashboard" name="Dashboard" icon={BsGraphUp} />

      {/* Cash Out */}
      <DynamicNavLinks
        address="/dashboard/cash-out"
        name="Cash Out"
        icon={FaArrowRightArrowLeft}
      />

      {/* Cash In */}
      <DynamicNavLinks
        address="/dashboard/cash-in"
        name="Cash In"
        icon={FaLongArrowAltLeft}
      />

      {/* Send Money */}
      <DynamicNavLinks
        address="/dashboard/send-money"
        name="Send Money"
        icon={FaLongArrowAltRight}
      />

      {/*Transaction History */}
      <DynamicNavLinks
        address="/dashboard/tx-history"
        name="Transactions"
        icon={LuHistory}
      />
    </>
  );
};

export default UserMenus;
