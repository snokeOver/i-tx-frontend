const CardSkeleton = () => {
  const totalCard = [...Array(6).keys()];
  return (
    <div className="container bg-base-100 mx-auto flex justify-center py-10 lg:py-24 h-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6  w-[90%] ">
        {totalCard.map((card) => (
          <div
            key={card}
            className="bg-base-100 rounded-xl border dark:border-gray-500 border-gray-300 shadow-xl hover:scale-[1.02] duration-500 h-fit p-2"
          >
            <div className="skeleton h-8 bg-gray-600 mx-6"></div>
            <div className="skeleton h-14 bg-gray-600 my-2"></div>
            <div className="skeleton h-4 bg-gray-600 my-2 mx-10"></div>
            <div className=" grid grid-cols-2 gap-3">
              <div className="skeleton h-14 bg-gray-600 my-2"></div>
              <div className="skeleton h-14 bg-gray-600 my-2"></div>
            </div>
            <div className="skeleton h-6 bg-gray-600 my-2"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSkeleton;
