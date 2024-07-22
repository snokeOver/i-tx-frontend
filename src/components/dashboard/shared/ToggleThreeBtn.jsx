const ToggleThreeBtn = ({
  setStatus,
  status,
  firstText,
  secondText,
  thirdText,
}) => {
  return (
    <>
      <label className="inline-flex w-full justify-center items-center px-2 rounded-md cursor-pointer text-gray-800">
        <span
          onClick={() => setStatus("Pending")}
          className={`px-4 py-1 rounded-l-md   flex-1 text-center duration-700 font-semibold ${
            status === "Pending" ? "bg-primary" : "bg-gray-300"
          }`}
        >
          {firstText}
        </span>
        <span
          onClick={() => setStatus("Completed")}
          className={`px-4 py-1 border-x border-gray-200 flex-1 text-center duration-700 font-semibold ${
            status === "Completed" ? "bg-primary" : "bg-gray-300"
          }`}
        >
          {secondText}
        </span>
        <span
          onClick={() => setStatus("Rejected")}
          className={`px-4 py-1 rounded-r-md   flex-1 text-center duration-700 font-semibold ${
            status === "Rejected" ? "bg-primary" : "bg-gray-300"
          }`}
        >
          {thirdText}
        </span>
      </label>
    </>
  );
};

export default ToggleThreeBtn;
