import { FaPhoneAlt } from "react-icons/fa";

const WithPhoneButton = ({ title }) => {
  return (
    <button className="btn bg-transparent  border-primary hover:bg-none dark:hover:bg-none rounded-sm py-2 w-full ">
      <FaPhoneAlt className="text-xl" />
      {title}
    </button>
  );
};

export default WithPhoneButton;
