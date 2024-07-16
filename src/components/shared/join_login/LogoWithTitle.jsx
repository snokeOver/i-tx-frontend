import { Link } from "react-router-dom";
import { FaMoneyBillTransfer } from "react-icons/fa6";

const LogoWithTitle = ({ title }) => {
  return (
    <>
      <Link
        to="/"
        className="bg-transparent border border-primary  rounded-full p-3"
      >
        <FaMoneyBillTransfer className="w-16 h-16 text-3xl" />
      </Link>
      <div className="text-center lg:text-left ">
        <h1 className="text-4xl font-bold">{title}</h1>
      </div>
    </>
  );
};

export default LogoWithTitle;
