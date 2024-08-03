import useGetData from "../../../hooks/useGetData";
import InitialPageStructure from "../shared/InitialPageStructure";
import TableViewStructure from "../shared/TableViewStructure";
import { useEffect, useState } from "react";
import SingleCompletedTxRow from "../shared/SingleCompletedTxRow";
import SingleRejectedTxRow from "../shared/SingleRejectedTxRow";
import ToggleThreeBtn from "../shared/ToggleThreeBtn";
import SinglePendingTxRow from "../shared/SinglePendingTxRow";

const HistoryUser = () => {
  const [status, setStatus] = useState("Pending");
  const [pagePending, setPagePending] = useState(false);

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
    const refetchData = async () => {
      setPagePending(true);
      await allPendingRefetch();
      setPagePending(false);
    };
    refetchData();
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
        error={tenUserTxHistoryError}
        isPending={tenUserTxHistoryPending || pagePending}
        data={tenUserTxHistory || []}
        emptyDataMsg={`No ${status} Tx To Show!`}
        totalName={`${status} Tx`}
      >
        {/* Table section */}
        <TableViewStructure
          data={tenUserTxHistory || []}
          tabCols={
            status === "Pending"
              ? ["Time & Date", "Amount", "Fees", "Agent/Recipient", "Tx Type"]
              : status === "Completed"
              ? ["Time & Date", "Amount", "Fees", "Agent/Recipient", "Tx Type"]
              : ["Time & Date", "Amount", "Agent", "Tx Type", "Reason"]
          }
          actionBtnNumbers={0}
        >
          {tenUserTxHistory &&
            tenUserTxHistory?.map((singleTx, index) =>
              status === "Pending" ? (
                <SinglePendingTxRow
                  index={index}
                  key={singleTx._id}
                  singlePendingTx={singleTx}
                  rowFor="User"
                />
              ) : status === "Completed" ? (
                <SingleCompletedTxRow
                  index={index}
                  key={singleTx._id}
                  singleCompletedTx={singleTx}
                  rowFor="User"
                />
              ) : (
                <SingleRejectedTxRow
                  index={index}
                  key={singleTx._id}
                  singleRejectedTx={singleTx}
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
