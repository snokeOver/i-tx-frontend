import { BsFillEyeFill } from "react-icons/bs";
import { GiVote } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { SlLike } from "react-icons/sl";
import {
  formatDate,
  truncateDescription,
} from "../../../helper/helperFunction";

const SurveyCard = ({ survey }) => {
  const navigate = useNavigate();
  const { _id, title, description, yesCount, noCount, likeCount, deadline } =
    survey;

  return (
    <div className="card card-compact bg-base-100 rounded-xl border dark:border-gray-500 border-gray-300 shadow-xl hover:scale-[1.02] duration-500">
      <div className="card-body">
        <div className=" flex-grow">
          <h2 className="card-title text-lg text-primary ">{title}</h2>
        </div>
        <div className="">
          <p className="text-justify">
            {truncateDescription(description, 15)}
            <button
              onClick={() => navigate(`/survey-details/${_id}`)}
              className="px-2 text-sky-600 text-xs rounded-lg hover:bg-primary hover:text-gray-900"
            >
              Show Details
            </button>
          </p>
        </div>

        <div className="w-full flex justify-center gap-2 text-sm mt-2">
          <h4 className="">Deadline:</h4>
          <h4 className=" rounded-lg px-2 border border-primary w-fit">
            {formatDate(deadline)}
          </h4>
        </div>

        <div className="grid grid-cols-2 gap-3 my-5">
          {/* Total Vote part */}
          <div className="flex gap-2 py-2 items-center flex-col border rounded-md dark:border-gray-700 border-gray-200 ">
            <GiVote className="text-3xl" />
            <h2 className="font-extrabold text-lg">Vote</h2>
            <h4 className="text-primary text-lg">{yesCount + noCount}</h4>
          </div>

          {/* Total Vote part */}
          <div className="flex gap-2 py-2 items-center flex-col border rounded-md dark:border-gray-700 border-gray-200 ">
            <SlLike className="text-3xl" />
            <h2 className="font-extrabold text-lg">Like</h2>
            <h4 className="text-primary text-lg">{likeCount}</h4>
          </div>
        </div>

        <div className="card-actions justify-end mt-auto">
          <button
            onClick={() => navigate(`/survey-details/${_id}`)}
            className="btn btn-primary btn-outline py-1 my-3 rounded-md w-full flex items-center justify-center"
          >
            <BsFillEyeFill className="text-xl" />
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyCard;
