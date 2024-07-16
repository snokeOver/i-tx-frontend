const TableSkeleton = () => {
  return (
    <div className="container mx-auto flex justify-center py-10 lg:py-24 min-h-screen">
      <div className="flex flex-col gap-4 w-[90%]">
        <div className="skeleton h-16 w-full"></div>
        <div className="skeleton h-10 w-full"></div>
        <div className="skeleton h-10 w-full"></div>
        <div className="skeleton h-10 w-full"></div>
        <div className="skeleton h-10 w-full"></div>
        <div className="skeleton h-10 w-full"></div>
        <div className="skeleton h-10 w-full"></div>
        <div className="skeleton h-10 w-full"></div>
        <div className="skeleton h-10 w-full"></div>
        <div className="skeleton h-10 w-full"></div>
      </div>
    </div>
  );
};

export default TableSkeleton;
