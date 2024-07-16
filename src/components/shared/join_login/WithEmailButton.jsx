import { MdEmail } from "react-icons/md";

const WithEmailButton = ({ title }) => {
  return (
    <button className="btn bg-transparent  border-primary hover:bg-none dark:hover:bg-none rounded-sm py-2 w-full ">
      <MdEmail className="text-xl" />
      {title}
    </button>
  );
};

export default WithEmailButton;
