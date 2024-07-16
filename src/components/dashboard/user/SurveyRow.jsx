import { Tooltip } from "react-tooltip";
import { TbListDetails } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const SurveyRow = ({ singleSurvey, index }) => {
  const navigate = useNavigate();
  const { surveyDetails, userResponse } = singleSurvey;
  const vote = userResponse?.vote;
  const preference = userResponse?.preference;
  const comment = userResponse?.comment;

  return (
    <>
      <tr className="cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-400 hover:scale-[1.02] duration-500">
        <th>{index + 1}</th>
        <td>{surveyDetails.title}</td>
        <td>
          <span
            className={`${
              vote === "YES"
                ? "bg-green-400"
                : vote === "NO"
                ? "bg-red-400"
                : "bg-yellow-500"
            } px-3 py-1 rounded-xl font-semibold text-gray-900`}
          >
            {vote || "Not_Voted"}
          </span>
        </td>
        <td>
          <span
            className={`${
              preference === "LIKE"
                ? "bg-green-400"
                : preference === "DISLIKE"
                ? "bg-red-400"
                : "bg-yellow-500"
            } px-3 py-1 rounded-xl font-semibold text-gray-900`}
          >
            {preference || "Neutral"}
          </span>
        </td>
        <td>
          {comment ? (
            <FaCheck className="text-green-500 text-2xl" />
          ) : (
            <RxCross2 className="text-red-400 text-2xl" />
          )}
        </td>

        <td className="details_btn_tooltip">
          <button
            onClick={() => navigate(`/survey-details/${surveyDetails._id}`)}
            className="text-gray-500 transition-colors duration-200   hover:text-primary focus:outline-none"
          >
            <TbListDetails className="text-xl" />
          </button>
        </td>
      </tr>
      <Tooltip
        anchorSelect=".details_btn_tooltip"
        place="bottom"
        className="z-50"
        variant="info"
      >
        <p>View Details</p>
      </Tooltip>
    </>
  );
};

export default SurveyRow;
