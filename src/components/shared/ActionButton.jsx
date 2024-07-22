import ButtonSpinner from "./ButtonSpinner";
import useData from "../../hooks/useData";

const ActionButton = ({ buttonText, isDisable = false, onClick }) => {
  const { actnBtnLoading } = useData();

  return (
    <button
      onClick={onClick}
      type="submit"
      disabled={actnBtnLoading || isDisable}
      className="btn btn-outline border-primary  text-primary  py-3 rounded-2xl hover:bg-primary hover:text-gray-800 hover:border-primary w-full"
    >
      {actnBtnLoading && <ButtonSpinner />}
      {buttonText}
    </button>
  );
};

export default ActionButton;
