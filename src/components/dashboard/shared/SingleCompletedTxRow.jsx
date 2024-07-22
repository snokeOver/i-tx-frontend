import { TbCurrencyTaka } from "react-icons/tb";
import { formatDateTime } from "../../../helper/helperFunction";
const SingleCompletedTxRow = ({ singlePendingTx, index, rowFor }) => {
  const { userNumber, agentNumber, amount, createdAt, txType, charge } =
    singlePendingTx;

  return (
    <>
      <tr className="cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-400 hover:scale-[1.02] duration-500 text-[11px] lg:text-xs">
        <th className="text-sm">{index + 1}</th>
        <td>{formatDateTime(createdAt)}</td>
        <td>
          <div className="flex items-center">
            <TbCurrencyTaka className="text-base" />
            <span className={`${rowFor === "User" ? "text-prime" : ""}`}>
              {amount.toFixed(2)}
            </span>
          </div>
        </td>
        <td>
          <div className="flex items-center">
            <TbCurrencyTaka className="text-base" />
            <span className={`${rowFor === "User" ? "" : "text-prime"}`}>
              {charge.toFixed(2)}
            </span>
          </div>
        </td>
        <td>{rowFor === "User" ? agentNumber : userNumber}</td>

        <td className="min-w-20">
          <span
            className={`${
              txType === "Cash Out" ? "bg-green-500 " : "bg-blue-500"
            } text-gray-800 p-1 rounded-md`}
          >
            {txType}
          </span>
        </td>
      </tr>
    </>
  );
};

export default SingleCompletedTxRow;
