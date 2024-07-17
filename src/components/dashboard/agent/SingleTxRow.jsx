import { Tooltip } from "react-tooltip";
import { TbListDetails } from "react-icons/tb";
import { TbCurrencyTaka } from "react-icons/tb";
import { formatDateTime } from "../../../helper/helperFunction";
const SingleTxRow = ({ singlePendingTx, index, handleActions }) => {
  const { userNumber, amount, createdAt } = singlePendingTx;

  return (
    <>
      <tr className="cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-400 hover:scale-[1.02] duration-500">
        <th>{index + 1}</th>
        <td>{formatDateTime(createdAt)}</td>
        <td className="flex items-center gap-1">
          <TbCurrencyTaka className="text-lg" />
          <span className="text-prime">{amount.toFixed(2)}</span>
        </td>
        <td>{userNumber}</td>

        <td className="details_btn_tooltip  flex justify-center">
          <button
            onClick={() => handleActions(singlePendingTx)}
            className="text-gray-500 transition-colors duration-200   hover:text-primary focus:outline-none"
          >
            <TbListDetails className="text-xl" />
          </button>
        </td>
      </tr>

      <Tooltip
        anchorSelect=".details_btn_tooltip"
        place="bottom"
        className="z-50"
        variant="info"
      >
        <p>Accept/Reject</p>
      </Tooltip>
    </>
  );
};

export default SingleTxRow;
