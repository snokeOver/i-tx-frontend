import { TbCurrencyTaka } from "react-icons/tb";
import { formatDateTime } from "../../../helper/helperFunction";

const SinglePendingTxRow = ({ singlePendingTx, index, rowFor }) => {
  const {
    userNumber,
    agentNumber,
    recipientNumber,
    amount,
    createdAt,
    txType,
    charge,
  } = singlePendingTx;

  return (
    <>
      <tr className="cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-400 hover:scale-[1.02] duration-500">
        <th>{index + 1}</th>
        <td>{formatDateTime(createdAt)}</td>
        <td className="flex items-center gap-1">
          <TbCurrencyTaka className="text-lg" />
          <span className="text-prime">{amount.toFixed(2)}</span>
        </td>
        <td>
          <div className="flex items-center">
            <TbCurrencyTaka className="text-base" />
            <span className={`${rowFor === "User" ? "" : "text-prime"}`}>
              {charge.toFixed(2)}
            </span>
          </div>
        </td>

        <td>
          {rowFor === "Agent" ? userNumber : agentNumber || recipientNumber}
        </td>
        {rowFor === "Admin" && <td> {userNumber}</td>}

        <td className="min-w-20">
          <span
            className={`${
              txType === "Cash Out" ? "bg-green-500 " : "bg-blue-400"
            } text-gray-800 p-1 md:px-2 rounded-md`}
          >
            {txType}
          </span>
        </td>
      </tr>
    </>
  );
};

export default SinglePendingTxRow;