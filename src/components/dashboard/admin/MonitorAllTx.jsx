import { useNavigate } from "react-router-dom";
import useGetData from "../../../hooks/useGetData";
import InitialPageStructure from "../shared/InitialPageStructure";
import TableViewStructure from "../shared/TableViewStructure";
import SinglePaymentRow from "./payments_SurveyResponse/SinglePaymentRow";
import SingleSurveyWithResponse from "./payments_SurveyResponse/SingleSurveyWithResponse";
import { useState } from "react";
import ToggleBtn from "../shared/ToggleBtn";

const MonitorAllTx = () => {
  const [toggle, setToggle] = useState(false);

  const navigate = useNavigate();

  const toggleHandler = (e) => {
    setToggle(e.target.checked);
  };

  const {
    data: allPayments,
    isPending: allPaymentsPending,
    error: allPaymentsError,
  } = useGetData({ apiRoute: "all-payments" });

  const {
    data: mySurveys,
    isPending,
    error,
  } = useGetData({ apiRoute: "responded-surveys" });

  // Hanlde the view details button
  const handleViewDetails = (id) => {
    navigate(`/dashboard/admin/survey/${id}`);
  };

  return (
    <>
      <div className="max-w-lg mx-auto my-4">
        <ToggleBtn
          toggle={toggle}
          toggleHandler={toggleHandler}
          firstText="All Payments"
          secondText="Survey Responses"
        />
      </div>
      {!toggle ? (
        <InitialPageStructure
          pageName="Payments"
          pageTitle="All Successfull Payments"
          error={allPaymentsError}
          isPending={allPaymentsPending}
          data={allPayments || []}
          emptyDataMsg="No Payments To Show!"
          totalName="Payment"
        >
          {/* Table section */}
          <TableViewStructure
            data={allPayments || []}
            tabCols={[
              "Transaction ID",
              "Time & Date",
              "User Name",
              "Amount",
              "Package",
              "Current Role",
            ]}
            actionBtnNumbers={0}
          >
            {allPayments &&
              allPayments.map((singlePayment, index) => (
                <SinglePaymentRow
                  index={index}
                  key={singlePayment._id}
                  singlePayment={singlePayment}
                />
              ))}
          </TableViewStructure>
        </InitialPageStructure>
      ) : (
        <InitialPageStructure
          pageName="Created Surveys"
          pageTitle="All created Surveys"
          error={error}
          isPending={isPending}
          data={mySurveys || []}
          emptyDataMsg="You didn't create any survey Yet!"
          direction={`/dashboard/surveyor/create`}
          totalName="Survey"
        >
          {/* Table section */}
          <TableViewStructure
            data={mySurveys || []}
            tabCols={["Title", "Category", "Responses"]}
            actionBtnNumbers={1}
          >
            {mySurveys &&
              mySurveys.map((singleSurvey, index) => (
                <SingleSurveyWithResponse
                  index={index}
                  key={singleSurvey._id}
                  singleSurvey={singleSurvey}
                  handleViewDetails={handleViewDetails}
                />
              ))}
          </TableViewStructure>
        </InitialPageStructure>
      )}
    </>
  );
};

export default MonitorAllTx;
