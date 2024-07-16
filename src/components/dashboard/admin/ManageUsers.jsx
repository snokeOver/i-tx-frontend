import SingleUserRow from "./SingleUserRow";
import useUpdateData from "../../../hooks/useUpdateData";
import { useEffect, useState } from "react";
import ActionButton from "../../shared/ActionButton";
import useGetData from "../../../hooks/useGetData";
import InitialPageStructure from "../shared/InitialPageStructure";
import TableViewStructure from "../shared/TableViewStructure";
import useAuth from "../../../hooks/useAuth";
import useData from "../../../hooks/useData";
import { IoIosSearch } from "react-icons/io";
import PrimaryButton from "../../shared/PrimaryButton";

const ManageUsers = () => {
  const updateUserRole = useUpdateData();

  const [openModal, setOpenModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [currStatus, setCurrStatus] = useState("");
  const [currUserStatus, setCurrUserStatus] = useState("");
  const [search, setSearch] = useState("");
  const { userDetails } = useAuth();
  const { setToastMsg } = useData();
  const {
    data: allUsers,
    isPending,
    error,
    refetch: refetchUsers,
  } = useGetData({
    apiRoute: "all-users",
    additionalQuerry: `userRole=${currUserStatus}&search=${search}`,
  });

  // Refetch data when currentPage or itemsPerPage changes
  useEffect(() => {
    refetchUsers();
  }, [currUserStatus, search]);

  // handle the Update initiation
  const handleUpdateStatusInitiate = (currUser) => {
    if (userDetails.mobile === currUser.mobile) {
      return setToastMsg("err This Action Not Permitted !");
    }
    setCurrStatus(currUser.userStatus);

    setCurrentUser(currUser);
    setOpenModal(true);
  };

  // handle Update user Status
  const handleUpdateUserStatus = async (user, fromApprove = "NO") => {
    if (currStatus && currStatus && currentUser.userStatus === currStatus) {
      return setToastMsg(`err Status is already '${currStatus}' !`);
    }
    let payload = {};
    if (fromApprove === "NO") {
      payload = {
        userStatus: currentUser.userStatus,
        userRole: currentUser.userRole,
      };
    } else {
      payload = {
        userStatus: "Active",
        userRole: user.userRole,
      };
    }

    console.log(payload);

    await updateUserRole(
      currentUser._id || user._id,
      "Role",
      "update-user-status",
      payload,
      "noSkip",
      ["all-users"]
    );
    setCurrStatus(currentUser.userStatus);
    setCurrentUser({});
  };

  // Handle the Search functionality
  const handleSearch = (e) => {
    e.preventDefault();

    const searchValue = e.target.parentNode.querySelector(
      'input[name="searchVal"]'
    ).value;

    setSearch(searchValue || "");
    e.target.parentNode.querySelector('input[name="searchVal"]').value = "";
  };

  return (
    <InitialPageStructure
      pageName="Manage User"
      pageTitle="All registered user"
      error={error}
      isPending={isPending}
      data={allUsers || []}
      emptyDataMsg="No Users Registered Yet!"
      totalName="User"
    >
      {/* Filter secion */}
      <div className="flex items-center flex-col xl:flex-row gap-4 md:gap-10 justify-between min-h-0 bg-blue-200 dark:bg-gray-800 rounded-lg w-[98%] lg:w-[90%] mx-auto my-5 py-5 lg:py-2 px-5">
        {/* End part */}
        <div className="flex items-center gap-3 md:gap-10 flex-1 flex-col md:flex-row w-full lg:justify-end">
          {/* Category Part */}
          <div className="flex flex-col lg:flex-row w-full">
            <div className="form-control min-w-44">
              <select
                onChange={(e) => {
                  setCurrUserStatus(e.target.value);
                }}
                type="text"
                className="select category-select select-bordered w-full bg-sky-100 dark:bg-gray-800 border-sky-500 dark:border-yellow-100"
              >
                <option value="">Select a Role</option>
                <option value="User">User</option>
                <option value="Agent">Agent</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-1 w-full">
          <div className="flex gap-5 justify-between items-center w-full">
            {/* Search Input */}
            <form onSubmit={handleSearch} className="w-full">
              <fieldset className="form-control w-full">
                <div className=" relative text-gray-400 text-xl font-semibold">
                  <input
                    type="text"
                    name="searchVal"
                    placeholder="Search . . . "
                    className="input search-input  w-full bg-transparent rounded-md  placeholder-gray-600 dark:placeholder-gray-100 border-sky-500 dark:border-yellow-100"
                  />
                  <IoIosSearch
                    onClick={handleSearch}
                    className="absolute cursor-pointer hover:text-primary right-5  top-3"
                  />
                </div>
              </fieldset>
            </form>

            {/* Reset button */}
            <div onClick={() => setSearch("")}>
              <PrimaryButton text="Reset" />
            </div>
          </div>
        </div>
      </div>

      {/* Table section */}
      <TableViewStructure
        data={allUsers || []}
        tabCols={["Email", "Name", "Mobile No.", "Role", "Status"]}
        actionBtnNumbers={2}
      >
        {allUsers &&
          allUsers.map((singleUser, index) => (
            <SingleUserRow
              index={index}
              key={singleUser._id}
              singleUser={singleUser}
              handleUpdateStatusInitiate={handleUpdateStatusInitiate}
              handleUpdateUserStatus={handleUpdateUserStatus}
            />
          ))}
      </TableViewStructure>

      {/* modal to update User Role */}
      <dialog className={`modal ${openModal ? "modal-open" : ""} `}>
        <div className="modal-box  bg-base-200 p-0 py-3">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              onClick={() => setOpenModal(false)}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <div className="">
            <h2 className="text-2xl text-center font-semibold mb-5 flex flex-col gap-3">
              <span>Update This User Role:</span>
              <span className="text-primary ml-3">
                {currentUser.name || currentUser.userId}
              </span>
            </h2>
          </div>
          <div className="w-[80%] xl:w-[70%] mx-auto mt-10">
            <div className="flex justify-center">
              <select
                value={currentUser.currStatus}
                onChange={(e) =>
                  setCurrentUser((prevData) => ({
                    ...prevData,
                    userStatus: e.target.value,
                  }))
                }
                className="select select-bordered w-full max-w-xs"
              >
                <option value="">Select a Status</option>
                <option value="Pending">Pending</option>
                <option value="Active">Active</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>

            <div
              onClick={() => handleUpdateUserStatus(currentUser._id)}
              className="form-control mt-16 mb-5  mx-auto"
            >
              <ActionButton buttonText="Update User Role" />
            </div>
          </div>
        </div>
      </dialog>
    </InitialPageStructure>
  );
};

export default ManageUsers;
