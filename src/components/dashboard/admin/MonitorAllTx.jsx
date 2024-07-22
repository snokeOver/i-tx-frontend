import useGetData from "../../../hooks/useGetData";
import InitialPageStructure from "../shared/InitialPageStructure";
import TableViewStructure from "../shared/TableViewStructure";
import { useEffect, useState } from "react";
import SingleRejectedTxRow from "../shared/SingleRejectedTxRow";
import SingleCompletedTxRow from "../shared/SingleCompletedTxRow";
import ToggleThreeBtn from "../shared/ToggleThreeBtn";
import SinglePendingTxRow from "../shared/SinglePendingTxRow";

const MonitorAllTx = () => {
  const [status, setStatus] = useState("Completed");

  const {
    data: twentyAgentTxHistory,
    isPending: twentyAgentTxHistoryPending,
    error: twentyAgentTxHistoryError,
    refetch: allPendingRefetch,
  } = useGetData({
    apiRoute: "monitor-tx-history",
    additionalQuerry: `status=${status}`,
  });

  // Refetch when status change
  useEffect(() => {
    allPendingRefetch();
  }, [status]);

  return (
    <>
      <div className="max-w-lg mx-auto my-4">
        <ToggleThreeBtn
          setStatus={setStatus}
          status={status}
          firstText="Pending"
          secondText="Completed"
          thirdText="Rejected"
        />
      </div>

      <InitialPageStructure
        pageName="Pending Tx"
        error={twentyAgentTxHistoryError}
        isPending={twentyAgentTxHistoryPending}
        data={twentyAgentTxHistory || []}
        emptyDataMsg={`No ${status} Tx To Show!`}
        totalName={`${status} Tx`}
      >
        {/* Table section */}
        <TableViewStructure
          data={twentyAgentTxHistory || []}
          tabCols={
            status === "Pending"
              ? [
                  "Time & Date",
                  "Amount",
                  "Commission",
                  "Agent",
                  "Customer",
                  "Tx Type",
                ]
              : status === "Completed"
              ? [
                  "Time & Date",
                  "Amount",
                  "Commission",
                  "Agent/Recipient",
                  "Customer",
                  "Tx Type",
                ]
              : [
                  "Time & Date",
                  "Amount",
                  "Agent",
                  "Customer",
                  "Tx Type",
                  "Reason",
                ]
          }
          actionBtnNumbers={0}
        >
          {twentyAgentTxHistory &&
            twentyAgentTxHistory?.map((singleTx, index) =>
              status === "Pending" ? (
                <SinglePendingTxRow
                  index={index}
                  key={singleTx._id}
                  singlePendingTx={singleTx}
                  rowFor="Admin"
                />
              ) : status === "Completed" ? (
                <SingleCompletedTxRow
                  index={index}
                  key={singleTx._id}
                  singleCompletedTx={singleTx}
                  rowFor="Admin"
                />
              ) : (
                <SingleRejectedTxRow
                  index={index}
                  key={singleTx._id}
                  singleRejectedTx={singleTx}
                  rowFor="Admin"
                />
              )
            )}
        </TableViewStructure>
      </InitialPageStructure>
    </>
  );
};

export default MonitorAllTx;
