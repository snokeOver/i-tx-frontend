import useGetData from "../../../hooks/useGetData";
import InitialPageStructure from "../shared/InitialPageStructure";
import TableViewStructure from "../shared/TableViewStructure";
import { useEffect, useState } from "react";
import ToggleBtn from "../shared/ToggleBtn";
import SingleTxRow from "./SingleTxRow";
import { FaCheck } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import ActionButton from "../../shared/ActionButton";
import useAuth from "../../../hooks/useAuth";
import useUpdateData from "../../../hooks/useUpdateData";

const PendingTxForAgent = () => {
  const [toggle, setToggle] = useState(false);
  const { userDetails, refetchUserDetails } = useAuth();
  const [type, setType] = useState("Cash Out");

  const [openModal, setOpenModal] = useState(false);
  const [currentData, setCurrentData] = useState({});
  const [option, setOption] = useState("Pending");
  const [rejectReason, setRejectReason] = useState("");

  const updateTxRequest = useUpdateData();

  const toggleHandler = (e) => {
    setToggle(e.target.checked);
  };

  const {
    data: allPendingTx,
    isPending: pendingTxPending,
    error: allPendingTxError,
    refetch: allPendingRefetch,
  } = useGetData({
    apiRoute: "agent-pending-tx",
    additionalQuerry: `type=${type}`,
  });

  // Refetch when type change
  useEffect(() => {
    allPendingRefetch();
  }, [type]);

  // Handle toggle
  useEffect(() => {
    setType((prev) => (prev === "Cash Out" ? "Cash In" : "Cash Out"));
  }, [toggle]);

  // handle the Action button Initiate
  const handleActions = (currTx) => {
    setCurrentData(currTx);
    setOpenModal(true);
  };

  // Handle Update Button
  const handleUpdate = async () => {
    console.log(currentData);
    await updateTxRequest(
      userDetails._id,
      "Role",
      "update-pending-tx",
      currentData,
      "noSkip",
      ["agent-pending-tx"]
    );

    await refetchUserDetails(userDetails);
    setCurrentData({});
    setOpenModal(false);
    // navigate("/dashboard/cash-out");
  };

  // option change to set current data
  useEffect(() => {
    setCurrentData((prevData) => ({
      ...prevData,
      status: option,
      txType: type,
    }));
  }, [option]);

  return (
    <>
      <div className="max-w-lg mx-auto my-4">
        <ToggleBtn
          toggle={toggle}
          toggleHandler={toggleHandler}
          firstText="Cash Out"
          secondText="Cash In"
        />
      </div>

      <InitialPageStructure
        pageName="Pending Tx"
        pageTitle={`${toggle ? "Pending Cash In" : "Pending Cash Out"}`}
        error={allPendingTxError}
        isPending={pendingTxPending}
        data={allPendingTx || []}
        emptyDataMsg={`No Pending Cash${
          toggle ? " In" : "Out"
        } Request To Show!`}
        totalName={`Cash ${toggle ? "In" : "Out"}`}
      >
        {/* Table section */}
        <TableViewStructure
          data={allPendingTx || []}
          tabCols={["Time & Date", "Amount", "User Number"]}
          actionBtnNumbers={1}
        >
          {allPendingTx &&
            allPendingTx.map((singlePendingTx, index) => (
              <SingleTxRow
                index={index}
                key={singlePendingTx._id}
                singlePendingTx={singlePendingTx}
                handleActions={handleActions}
              />
            ))}
        </TableViewStructure>
      </InitialPageStructure>

      {/* modal to Update the action like Complete/Reject */}
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
              <span>Update This Transaction</span>
            </h2>
          </div>
          <div className="w-[80%] xl:w-[70%] mx-auto mt-10">
            <div className="border min-w-2xl border-gray-300 dark:border-gray-700 rounded-xl p-7 flex flex-col gap-3 mx-auto">
              <div className="grid grid-cols-2 gap-5">
                <h4 className="text-right">Number:</h4>
                <h5 className="text-right">{currentData?.userNumber}</h5>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <h4 className="text-right">Amount:</h4>
                <h5 className="text-right">
                  {currentData?.amount?.toFixed(2)}
                </h5>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <h4 className="text-right">Comission:</h4>
                <h5 className="text-right text-prime">
                  {currentData?.charge?.toFixed(2)}
                </h5>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1 text-lg my-10">
              <button
                onClick={() => setOption("Completed")}
                className={`flex gap-2 rounded-md justify-center items-center hover:bg-green-200  hover:text-gray-900  ${
                  option === "Completed"
                    ? "bg-green-200 text-gray-900 duration-300"
                    : "dark:bg-gray-700 bg-gray-200 duration-300"
                }`}
              >
                <FaCheck className="text-green-500" />
                <span>Completed</span>
              </button>
              <button
                onClick={() => setOption("Rejected")}
                className={`flex gap-2 rounded-md justify-center items-center hover:bg-green-200  hover:text-gray-900  ${
                  option === "Rejected"
                    ? "bg-green-200 text-gray-900 duration-300"
                    : "dark:bg-gray-700 bg-gray-200 duration-300"
                }`}
              >
                <ImCancelCircle className="text-red-500" />
                <span>Rejected</span>
              </button>
            </div>

            {/* Reject Reason selection */}

            {option === "Rejected" && (
              <div className="flex justify-center w-full my-10">
                <select
                  value={currentData?.rejectReason || "No"}
                  onChange={(e) =>
                    setCurrentData((prevData) => ({
                      ...prevData,
                      rejectReason: e.target.value,
                    }))
                  }
                  className="select select-bordered w-full max-w-xs"
                >
                  <option value="No">Select a Reason</option>
                  <option value="User Limit">User Limit</option>
                  <option value="Agent Limit">Agent Limit</option>
                  <option value="Technical Error">Technical Error</option>
                </select>
              </div>
            )}

            <div onClick={handleUpdate} className="form-control  mb-5  mx-auto">
              <ActionButton
                buttonText="Confirm Update"
                isDisable={
                  currentData?.status === "Pending"
                    ? true
                    : false || (option && currentData.rejectReason === "No")
                    ? true
                    : false
                }
              />
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default PendingTxForAgent;
