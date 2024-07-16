import { FaQuoteLeft } from "react-icons/fa";
const HowItWorksCard = ({ data }) => {
  const { title, description, image } = data;
  return (
    <div className="card w-72 card-compact bg-base-100 rounded-xl border dark:border-yellow-200 border-sky-200 shadow-xl mr-10 md:mr-16 lg:mr-28 hover:!scale-[1.02] duration-500">
      <figure className="mt-7 ">
        <div className="w-2/3 ">
          <img
            src={image}
            alt={image}
            className="border dark:border-gray-700 border-gray-300  rounded-full   mx-auto p-2 "
          />
        </div>
      </figure>
      <div className="card-body  text-center flex-grow">
        <h2 className="text-lg font-semibold text-center text-primary mb-2">
          {title}
        </h2>
        <div className="text-justify text-sm flex-grow">
          <FaQuoteLeft />

          <span className="ml-4 mt-1">{description}</span>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksCard;
