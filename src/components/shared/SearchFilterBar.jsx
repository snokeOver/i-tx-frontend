import { TfiLayoutGrid3, TfiLayoutMenuV } from "react-icons/tfi";
import { IoIosSearch } from "react-icons/io";
import PrimaryButton from "../components/shared/PrimaryButton";

const SearchFilterBar = ({
  handleSearch,
  setSearch,
  setCurrentPage,
  setCurrCategory,
  surveyCategories,
  setCurrSort,
  setLayoutSelect,
  layoutSelect,
}) => {
  return (
    <div className="flex items-center flex-col xl:flex-row gap-4 md:gap-10 justify-between min-h-0 bg-blue-200 dark:bg-gray-800 rounded-lg w-[98%] lg:w-[90%] mx-auto py-5 lg:py-2 px-5">
      {/* start part */}
      <div className="flex flex-1 w-full">
        <div className="flex gap-5 justify-between items-center w-full">
          {/* Search Input */}
          <form onSubmit={handleSearch} className="w-full">
            <fieldset className="form-control w-full">
              <div className=" relative text-gray-400 text-xl font-semibold">
                <input
                  type="text"
                  name="searchVal"
                  placeholder="Search . . . "
                  className="input search-input  w-full bg-transparent rounded-md  placeholder-gray-600 dark:placeholder-gray-100 border-sky-500 dark:border-yellow-100"
                />
                <IoIosSearch
                  onClick={handleSearch}
                  className="absolute cursor-pointer hover:text-primary right-5  top-3"
                />
              </div>
            </fieldset>
          </form>

          {/* Reset button */}
          <div onClick={() => setSearch("")}>
            <PrimaryButton text="Reset" />
          </div>
        </div>
      </div>

      {/* End part */}
      <div className="flex items-center gap-3 md:gap-10 flex-1 flex-col md:flex-row w-full lg:justify-end">
        {/* Category Part */}
        <div className="flex flex-col lg:flex-row w-full">
          <div className="form-control min-w-44">
            <select
              onChange={(e) => {
                setCurrentPage(1);
                setCurrCategory(e.target.value);
              }}
              type="text"
              className="select category-select select-bordered w-full bg-sky-100 dark:bg-gray-800 border-sky-500 dark:border-yellow-100"
            >
              <option value="">Select a Category</option>
              {surveyCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sorting Part */}
        <div className="flex flex-col lg:flex-row w-full">
          <div className="form-control min-w-36">
            <select
              onChange={(e) => {
                setCurrentPage(1);
                setCurrSort(e.target.value);
              }}
              type="text"
              className="select category-select select-bordered w-full bg-sky-100 dark:bg-gray-800 border-sky-500 dark:border-yellow-100"
            >
              <option value="">Select A Filter</option>
              <option value="deadline:asc">Deadline ⬆️</option>
              <option value="deadline:des">Deadline ⬇️</option>
              <option value="voteCount:asc">Vote Count ⬆️</option>
              <option value="voteCount:des">Vote Count ⬇️</option>
            </select>
          </div>
        </div>

        {/* Option part */}
        <div className="flex gap-4 w-fit">
          <div className="hover:scale-125 duration-500">
            <TfiLayoutGrid3
              onClick={() => setLayoutSelect(false)}
              className={`cursor-pointer hover:text-primary text-2xl ${
                !layoutSelect ? "text-primary" : ""
              }`}
            />
          </div>
          <div className="hover:scale-125 duration-500">
            <TfiLayoutMenuV
              onClick={() => setLayoutSelect(true)}
              className={`cursor-pointer hover:text-primary text-2xl ${
                layoutSelect ? "text-primary" : ""
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilterBar;
