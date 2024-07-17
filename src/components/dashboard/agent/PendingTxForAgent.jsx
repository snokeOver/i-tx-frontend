import { useNavigate } from "react-router-dom";
import useGetData from "../../../hooks/useGetData";
import InitialPageStructure from "../shared/InitialPageStructure";
import TableViewStructure from "../shared/TableViewStructure";
import { useEffect, useState } from "react";
import ToggleBtn from "../shared/ToggleBtn";
import SingleTxRow from "./SingleTxRow";
import { FaCheck } from "react-icons/fa";
import ActionButton from "../../shared/ActionButton";
import useAuth from "../../../hooks/useAuth";
import useUpdateData from "../../../hooks/useUpdateData";

const PendingTxForAgent = () => {
  const [toggle, setToggle] = useState(false);
  const { userDetails, refetchUserDetails } = useAuth();
  const [type, setType] = useState("Cash Out");
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [currentData, setCurrentData] = useState({});
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

            <div className="flex justify-center w-full my-10">
              <select
                value={currentData.currStatus}
                onChange={(e) =>
                  setCurrentData((prevData) => ({
                    ...prevData,
                    status: e.target.value,
                    txType: "Cash Out",
                  }))
                }
                className="select select-bordered w-full max-w-xs"
              >
                <option value="Pending">Select a Status</option>
                <option value="Completed">Completed</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div onClick={handleUpdate} className="form-control  mb-5  mx-auto">
              <ActionButton
                buttonText="Verify & Update"
                isDisable={currentData.status === "Pending" ? true : false}
              />
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default PendingTxForAgent;
