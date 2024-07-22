import { TbCurrencyTaka } from "react-icons/tb";
import { formatDateTime } from "../../../helper/helperFunction";

const SingleRejectedTxRow = ({ singlePendingTx, index, rowFor }) => {
  const { userNumber, agentNumber, amount, createdAt, txType, rejectReason } =
    singlePendingTx;

  return (
    <>
      <tr className="cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-400 hover:scale-[1.02] duration-500 text-[11px] lg:text-xs">
        <th>{index + 1}</th>
        <td>{formatDateTime(createdAt)}</td>
        <td>
          <div className="flex items-center">
            <TbCurrencyTaka className="text-base" />
            <span>{amount.toFixed(2)}</span>
          </div>
        </td>

        <td>{rowFor === "User" ? agentNumber : userNumber}</td>

        <td>{txType}</td>
        <td className="text-prime">{rejectReason}</td>
      </tr>
    </>
  );
};

export default SingleRejectedTxRow;
