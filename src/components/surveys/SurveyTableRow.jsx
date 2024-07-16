import { Tooltip } from "react-tooltip";
import { TbListDetails } from "react-icons/tb";
import { formatDate } from "../../helper/helperFunction";
import { truncateDescription } from "../../helper/helperFunction";
import { useNavigate } from "react-router-dom";

const SurveyTableRow = ({ singleSurvey, index }) => {
  const { title, description, deadline, likeCount, yesCount, noCount, _id } =
    singleSurvey;
  const navigate = useNavigate();

  return (
    <>
      <tr className="cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-400 hover:scale-[1.02] duration-500">
        <th>{index + 1}</th>
        <td className={`my_tooltip_${index}`}>{title}</td>
        <td>
          {truncateDescription(description, 15)}{" "}
          <button
            onClick={() => navigate(`/survey-details/${_id}`)}
            className="px-2 text-sky-600 text-xs rounded-lg hover:bg-primary hover:text-gray-900"
          >
            Show Details
          </button>
        </td>
        <td>
          {new Date(deadline).setHours(0, 0, 0, 0) >=
          new Date().setHours(0, 0, 0, 0) ? (
            `${formatDate(deadline)}`
          ) : (
            <p className="text-yellow-500">Expired</p>
          )}
        </td>
        <td
          className={`${
            yesCount + noCount > 0 ? "text-sky-500" : "text-primary"
          } font-semibold text-lg`}
        >
          {yesCount + noCount}
        </td>
        <td
          className={`${
            likeCount > 0 ? "text-green-500" : "text-primary"
          } font-semibold text-lg`}
        >
          {likeCount}
        </td>

        <td className="details_btn_tooltip">
          <button
            onClick={() => navigate(`/survey-details/${_id}`)}
            className="text-gray-500 transition-colors duration-200   hover:text-primary focus:outline-none"
          >
            <TbListDetails className="text-xl" />
          </button>
        </td>
      </tr>

      <Tooltip
        anchorSelect=".delete_btn_tooltip"
        place="bottom"
        className="z-50"
        variant="warning"
      >
        <p>Delete</p>
      </Tooltip>
      <Tooltip
        anchorSelect=".update_btn_tooltip"
        place="bottom"
        className="z-50"
        variant="info"
      >
        <p>Update</p>
      </Tooltip>
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

export default SurveyTableRow;
