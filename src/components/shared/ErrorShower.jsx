const ErrorShower = ({ errMsg }) => {
  return (
    <span className="text-red-500 mt-2 dark:bg-gray-700 bg-gray-300 px-2 rounded-sm inline-flex">
      {errMsg}
    </span>
  );
};

export default ErrorShower;
