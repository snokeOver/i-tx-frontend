import useGetData from "../../../hooks/useGetData";
import InitialPageStructure from "../shared/InitialPageStructure";
import TableViewStructure from "../shared/TableViewStructure";
import { useEffect, useState } from "react";
import ToggleBtn from "../shared/ToggleBtn";
import SingleCompletedTxRow from "../shared/SingleCompletedTxRow";
import SingleRejectedTxRow from "../shared/SingleRejectedTxRow";

const HistoryUser = () => {
  const [toggle, setToggle] = useState(false);
  const [status, setStatus] = useState("Completed");

  const toggleHandler = (e) => {
    setToggle(e.target.checked);
  };

  const {
    data: tenUserTxHistory,
    isPending: tenUserTxHistoryPending,
    error: tenUserTxHistoryError,
    refetch: allPendingRefetch,
  } = useGetData({
    apiRoute: "user-tx-history",
    additionalQuerry: `status=${status}`,
  });

  // Refetch when status change
  useEffect(() => {
    allPendingRefetch();
  }, [status]);

  // Handle toggle
  useEffect(() => {
    setStatus((prev) => (prev === "Completed" ? "Rejected" : "Completed"));
  }, [toggle]);

  return (
    <>
      <div className="max-w-lg mx-auto my-4">
        <ToggleBtn
          toggle={toggle}
          toggleHandler={toggleHandler}
          firstText="Conpleted"
          secondText="Rejected"
        />
      </div>

      <InitialPageStructure
        pageName="Pending Tx"
        pageTitle={`${toggle ? "Rejected Tx" : "Completed Tx"}`}
        error={tenUserTxHistoryError}
        isPending={tenUserTxHistoryPending}
        data={tenUserTxHistory || []}
        emptyDataMsg={`No ${toggle ? " Rejected" : "Completed"} Tx To Show!`}
        totalName={`${toggle ? "Rejected" : "Completed"} Tx`}
      >
        {/* Table section */}
        <TableViewStructure
          data={tenUserTxHistory || []}
          tabCols={
            toggle
              ? ["Time & Date", "Amount", "Agent", "Tx Type", "Reason"]
              : ["Time & Date", "Amount", "Fees", "Agent", "Tx Type"]
          }
          actionBtnNumbers={0}
        >
          {tenUserTxHistory &&
            tenUserTxHistory?.map((singlePendingTx, index) =>
              toggle ? (
                <SingleRejectedTxRow
                  index={index}
                  key={singlePendingTx._id}
                  singlePendingTx={singlePendingTx}
                  rowFor="User"
                />
              ) : (
                <SingleCompletedTxRow
                  index={index}
                  key={singlePendingTx._id}
                  singlePendingTx={singlePendingTx}
                  rowFor="User"
                />
              )
            )}
        </TableViewStructure>
      </InitialPageStructure>
    </>
  );
};

export default HistoryUser;
