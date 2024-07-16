const PageTitle = ({ title, subTitle }) => {
  return (
    <div className="flex flex-col gap-5 md:gap-7 justify-center items-center mb-7 md:mb-10">
      <h2 className="text-center text-2xl md:text-3xl lg:text-4xl border-y border-dashed border-primary w-fit py-2 lg:py-3 px-2 md:px-5">
        {title}
      </h2>
      {subTitle && <h4 className="text-primary md:text-lg">{subTitle}</h4>}
    </div>
  );
};

export default PageTitle;
