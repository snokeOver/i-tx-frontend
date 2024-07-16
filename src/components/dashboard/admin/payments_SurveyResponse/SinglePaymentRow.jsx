import { formatDateTime } from "../../../../helper/helperFunction";

const SinglePaymentRow = ({ singlePayment, index }) => {
  const { paidAmount, txId, packageName, createdAt, userId } = singlePayment;

  return (
    <>
      <tr className="cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-400 hover:scale-[1.02] duration-500">
        <th>{index + 1}</th>
        <td>{txId}</td>
        <td>{userId.email}</td>
        <td>{formatDateTime(createdAt)}</td>

        <td>
          <span className="px-3 py-1 rounded-xl font-semibold text-gray-900 bg-sky-400">
            ${paidAmount}
          </span>
        </td>
        <td>
          <span
            className={`${
              packageName === "Business"
                ? "bg-green-400"
                : packageName === "Plus"
                ? "bg-sky-400"
                : "bg-gray-400"
            } px-3 py-1 rounded-xl font-semibold text-gray-900`}
          >
            {packageName}
          </span>
        </td>
        <td>
          <span className="px-3 py-1 rounded-xl font-semibold text-gray-900 bg-green-400">
            {userId.userRole}
          </span>
        </td>
      </tr>
    </>
  );
};

export default SinglePaymentRow;
