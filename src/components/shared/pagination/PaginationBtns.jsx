const PaginationBtns = ({
  pages,
  currentPage,
  numberOfPages,
  setCurrentPage,
  prevDisabled,
  handlePrevious,
  itemsPerPage,
  setItemsPerPage,
  setPrevDisabled,
  nextDisabled,
  handleNext,
}) => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center my-12">
      <div className="flex gap-3">
        {/* Page Button */}
        {pages.map((page) =>
          page === currentPage - 2 ||
          page === currentPage - 1 ||
          page === currentPage ||
          page === numberOfPages - 1 ? (
            <button
              onClick={() => setCurrentPage(page + 1)}
              key={page}
              className={`btn bg-transparent rounded-full py-2 px-3
            ${currentPage === page + 1 ? "border border-primary" : ""}`}
            >
              {page + 1}
            </button>
          ) : (
            <p key={page} className="text-3xl">
              <sup>.</sup>
            </p>
          )
        )}
      </div>
      <div className="flex gap-3">
        {/* Previous Button */}
        <button
          disabled={prevDisabled}
          onClick={handlePrevious}
          className="btn py-2 md:px-4  btn-primary btn-outline disabled:cursor-not-allowed disabled:text-gray-500"
        >
          <div className="flex items-center -mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>

            <span className="hidden lg:flex">Previous</span>
          </div>
        </button>
        {/* Select Items per page */}
        <div className="ml-2">
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(e.target.value);
              setCurrentPage(1);
              setPrevDisabled(true);
            }}
            className="select select-bordered w-full border-primary"
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="12">12</option>
            <option value="16">16</option>
          </select>
        </div>
        {/* Next Button */}
        <button
          disabled={nextDisabled}
          onClick={handleNext}
          className="btn py-2 md:px-4 btn-primary btn-outline disabled:cursor-not-allowed disabled:text-gray-500"
        >
          <div className="flex items-center -mx-1">
            <span className="hidden lg:flex">Next</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default PaginationBtns;
