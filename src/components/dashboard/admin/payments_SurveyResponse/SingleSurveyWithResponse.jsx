import { Tooltip } from "react-tooltip";
import { TbListDetails } from "react-icons/tb";

const SingleSurveyWithResponse = ({
  singleSurvey,
  index,

  handleViewDetails,
}) => {
  const { title, category, _id, totalResponse } = singleSurvey;

  return (
    <>
      <tr className="cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-400 hover:scale-[1.02] duration-500">
        <th>{index + 1}</th>
        <td>{title}</td>
        <td>{category}</td>

        <td>
          <span
            className={`${
              totalResponse > 0 ? "bg-sky-400 text-gray-900" : ""
            } font-bold text-lg px-4 rounded-xl`}
          >
            {totalResponse}
          </span>
        </td>

        <td className="details_btn_tooltip">
          <button
            onClick={() => handleViewDetails(_id)}
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
        <p>View Responses</p>
      </Tooltip>
    </>
  );
};

export default SingleSurveyWithResponse;
