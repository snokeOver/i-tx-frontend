import useGetData from "../../../hooks/useGetData";
import InitialPageStructure from "../shared/InitialPageStructure";
import TableViewStructure from "../shared/TableViewStructure";
import { useEffect, useState } from "react";
import ToggleBtn from "../shared/ToggleBtn";
import SingleCompletedTxRow from "./SingleCompletedTxRow";
import SingleRejectedTxRow from "./SingleRejectedTxRow";

const HistoryAgent = () => {
  const [toggle, setToggle] = useState(false);
  const [status, setStatus] = useState("Completed");

  const toggleHandler = (e) => {
    setToggle(e.target.checked);
  };

  const {
    data: twentyAgentTxHistory,
    isPending: twentyAgentTxHistoryPending,
    error: twentyAgentTxHistoryError,
    refetch: allPendingRefetch,
  } = useGetData({
    apiRoute: "agent-tx-history",
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
        error={twentyAgentTxHistoryError}
        isPending={twentyAgentTxHistoryPending}
        data={twentyAgentTxHistory || []}
        emptyDataMsg={`No ${toggle ? " Rejected" : "Completed"} Tx To Show!`}
        totalName={`${toggle ? "Rejected" : "Completed"} Tx`}
      >
        {/* Table section */}
        <TableViewStructure
          data={twentyAgentTxHistory || []}
          tabCols={
            toggle
              ? ["Time & Date", "Amount", "Customer", "Tx Type", "Reason"]
              : ["Time & Date", "Amount", "Commission", "Customer", "Tx Type"]
          }
          actionBtnNumbers={0}
        >
          {twentyAgentTxHistory &&
            twentyAgentTxHistory?.map((singlePendingTx, index) =>
              toggle ? (
                <SingleRejectedTxRow
                  index={index}
                  key={singlePendingTx._id}
                  singlePendingTx={singlePendingTx}
                />
              ) : (
                <SingleCompletedTxRow
                  index={index}
                  key={singlePendingTx._id}
                  singlePendingTx={singlePendingTx}
                />
              )
            )}
        </TableViewStructure>
      </InitialPageStructure>
    </>
  );
};

export default HistoryAgent;
