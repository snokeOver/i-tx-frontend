import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import SocialLinks from "../shared/SocialLinks";
import useData from "../../hooks/useData";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";

const Footer = () => {
  const { siteName } = useData();
  const { dashBoardPath } = useAuth();
  return (
    <footer className=" p-10 bg-blue-100 dark:bg-base-100 text-base-content border-t border-primary ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
        {/* First part */}
        <div className=" flex flex-col items-center gap-2">
          {/* Logo and Site Name part */}

          <div>
            <Link
              to={dashBoardPath}
              className="text-3xl font-semibold font-rubik flex justify-center flex-col items-center gap-2"
            >
              <div>
                <FaMoneyBillTransfer className="w-12 h-12 text-3xl" />
              </div>
            </Link>
          </div>

          <nav className="flex flex-col items-center gap-4">
            <div>
              <a className=" cursor-pointer  flex items-center gap-2 mb-1">
                <FaPhoneAlt className="text-primary" />
                <span className="hover:text-primary">+(880) 15171-66682</span>
              </a>
              <a className=" cursor-pointer  flex items-center gap-2">
                <MdEmail className="text-primary" />
                <span className="hover:text-primary">
                  shuvokuetece@gmail.com
                </span>
              </a>
            </div>
          </nav>
        </div>

        {/* Second part */}
        <div className="flex items-center justify-center">
          <div className="footer footer-center">
            {/* Copy Write part */}
            <aside className="text-xs flex gap-5 flex-col">
              <div>
                <SocialLinks />
              </div>
              <p>
                © {siteName} - {new Date().getFullYear()} - All right reserved
              </p>
            </aside>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
