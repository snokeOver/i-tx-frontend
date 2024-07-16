import { BsGraphUp } from "react-icons/bs";
import DynamicNavLinks from "./DynamicNavLinks";

import { FaRegMessage } from "react-icons/fa6";

const ProUserMenus = () => {
  return (
    <>
      {/* Prouser Statistics */}
      <DynamicNavLinks
        address="/dashboard/prouser"
        name="User Statistics"
        icon={BsGraphUp}
      />

      {/* Commnet Create on a survey */}
      <DynamicNavLinks
        address="/dashboard/prouser/comments"
        name="Commented Surveys"
        icon={FaRegMessage}
      />
    </>
  );
};

export default ProUserMenus;
