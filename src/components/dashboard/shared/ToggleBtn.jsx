const ToggleBtn = ({ toggleHandler, toggle, firstText, secondText }) => {
  return (
    <>
      <label className="inline-flex w-full justify-center items-center px-2 rounded-md cursor-pointer text-gray-800">
        <input
          onChange={toggleHandler}
          id="Toggle3"
          type="checkbox"
          className="hidden peer"
          checked={toggle}
        />
        <span className="px-4 py-1 rounded-l-md bg-primary peer-checked:bg-gray-300 flex-1 text-center duration-700 font-semibold">
          {firstText}
        </span>
        <span className="px-4 py-1 rounded-r-md bg-gray-300 peer-checked:bg-primary flex-1 text-center duration-700 font-semibold">
          {secondText}
        </span>
      </label>
    </>
  );
};

export default ToggleBtn;
