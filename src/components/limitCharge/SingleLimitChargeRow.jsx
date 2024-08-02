const SingleLimitChargeRow = ({ singleItem, index }) => {
  const { item, dailyLimit, monthlyLimit, charge } = singleItem;

  return (
    <>
      <tr className="cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-400 hover:scale-[1.02] duration-500">
        <th>{index + 1}</th>
        <td>{item}</td>
        <td>{dailyLimit}</td>
        <td>{monthlyLimit}</td>
        <td>{charge}</td>
      </tr>
    </>
  );
};

export default SingleLimitChargeRow;
