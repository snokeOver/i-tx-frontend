const Container = ({ children, nopad }) => {
  return (
    <div
      className={`max-w-[1620px]  mx-auto xl:px-20 md:px-10 px-2  bg-base-300 min-h-[calc(100vh-237px-64px)] ${
        nopad !== "true" ? "md:py-10 py-5" : "py-0"
      }`}
    >
      {children}
    </div>
  );
};

export default Container;
