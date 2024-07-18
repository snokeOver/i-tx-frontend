import { TbCurrencyTaka } from "react-icons/tb";
import { formatDateTime } from "../../../helper/helperFunction";
const SingleCompletedTxRow = ({ singlePendingTx, index }) => {
  const { userNumber, amount, createdAt, txType, charge } = singlePendingTx;

  return (
    <>
      <tr className="cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-400 hover:scale-[1.02] duration-500">
        <th>{index + 1}</th>
        <td>{formatDateTime(createdAt)}</td>
        <td>
          <div className="flex items-center gap-1">
            <TbCurrencyTaka className="text-lg" />
            <span>{amount.toFixed(2)}</span>
          </div>
        </td>
        <td>
          <div className="flex items-center gap-1">
            <TbCurrencyTaka className="text-lg" />
            <span className="text-prime">{charge.toFixed(2)}</span>
          </div>
        </td>
        <td>{userNumber}</td>

        <td className="flex justify-center">{txType}</td>
      </tr>
    </>
  );
};

export default SingleCompletedTxRow;
