import useGetData from "../../../hooks/useGetData";
import InitialPageStructure from "../shared/InitialPageStructure";
import TableViewStructure from "../shared/TableViewStructure";
import { useEffect, useState } from "react";
import ToggleBtn from "../shared/ToggleBtn";
import SingleRejectedTxRow from "../shared/SingleRejectedTxRow";
import SingleCompletedTxRow from "../shared/SingleCompletedTxRow";

const HistoryAgent = () => {
  const [toggle, setToggle] = useState(false);
  const [status, setStatus] = useState("Completed");
  const [pagePending, setPagePending] = useState(false);

  const toggleHandler = (e) => {
    setToggle(e.target.checked);
  };

  const {
    data: twentyAgentTxHistory,
    isPending: twentyAgentTxHistoryPending,
    error: twentyAgentTxHistoryError,
    refetch: twentyAgentTxHistoryRefetch,
  } = useGetData({
    apiRoute: "agent-tx-history",
    additionalQuerry: `status=${status}`,
  });

  // Refetch when status change
  useEffect(() => {
    const refetchData = async () => {
      setPagePending(true);
      await twentyAgentTxHistoryRefetch();
      setPagePending(false);
    };
    refetchData();
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
          firstText="Completed"
          secondText="Rejected"
        />
      </div>

      <InitialPageStructure
        pageName="Pending Tx"
        error={twentyAgentTxHistoryError}
        isPending={twentyAgentTxHistoryPending || pagePending}
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
            twentyAgentTxHistory?.map((singlegTx, index) =>
              toggle ? (
                <SingleRejectedTxRow
                  index={index}
                  key={singlegTx._id}
                  singleRejectedTx={singlegTx}
                  rowFor="Agent"
                />
              ) : (
                <SingleCompletedTxRow
                  index={index}
                  key={singlegTx._id}
                  singleCompletedTx={singlegTx}
                  rowFor="Agent"
                />
              )
            )}
        </TableViewStructure>
      </InitialPageStructure>
    </>
  );
};

export default HistoryAgent;
