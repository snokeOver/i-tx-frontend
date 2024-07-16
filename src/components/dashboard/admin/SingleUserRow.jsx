import { Tooltip } from "react-tooltip";
const SingleUserRow = ({
  singleUser,
  index,
  handleUpdateStatusInitiate,
  handleUpdateUserStatus,
}) => {
  const { name, email, _id, mobile, userRole, userStatus } = singleUser;

  return (
    <>
      <tr className="cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-400 hover:scale-[1.02] duration-500">
        <th>{index + 1}</th>
        <td className={`my_tooltip_${index}`}>{email}</td>
        <td>{name}</td>
        <td>{mobile}</td>
        <td>
          <span
            className={`${
              userRole === "Admin"
                ? "bg-yellow-400"
                : userRole === "User"
                ? "bg-sky-400"
                : "bg-green-400"
            } px-3 py-1 rounded-xl font-semibold text-gray-900`}
          >
            {userRole}
          </span>
        </td>
        <td>
          <span
            className={`${
              userStatus === "Pending"
                ? "bg-sky-400"
                : userStatus === "Active"
                ? "bg-green-400"
                : "bg-red-400"
            } px-3 py-1 rounded-xl font-semibold text-gray-900`}
          >
            {userStatus}
          </span>
        </td>
        <td className="update_btn_tooltip">
          <button
            onClick={() => handleUpdateStatusInitiate(singleUser)}
            className="text-gray-500 transition-colors duration-200   hover:text-primary focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>
        </td>
        <td className="make_Surveyor_btn_tooltip">
          {userStatus === "Pending" && (
            <button
              onClick={() => handleUpdateUserStatus(singleUser, "YES")}
              className="text-primary border border-primary hover:text-gray-800 hover:bg-primary rounded-xl px-2"
            >
              Approve
            </button>
          )}
        </td>
      </tr>
      <Tooltip
        anchorSelect=".update_btn_tooltip"
        place="bottom"
        className="z-50"
        variant="info"
      >
        <p>Update Status</p>
      </Tooltip>
    </>
  );
};

export default SingleUserRow;
