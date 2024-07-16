import InitialPageStructure from "../shared/InitialPageStructure";
import useGetData from "../../../hooks/useGetData";
import ReportedSurveyRow from "./ReportedSurveyRow";
import TableViewStructure from "../shared/TableViewStructure";

const ReportedSurveys = () => {
  const {
    data: participatedSurveys,
    isPending,
    error,
  } = useGetData({ apiRoute: "reported-surveys" });

  return (
    <InitialPageStructure
      pageName="Reported Surveys"
      pageTitle="All My Reported Surveys"
      error={error}
      isPending={isPending}
      data={participatedSurveys || []}
      emptyDataMsg="You didn't report any survey yet!"
      direction={`/`}
      totalName="Reported Survey"
    >
      {/* Table section */}
      <TableViewStructure
        data={participatedSurveys || []}
        tabCols={["Title", "Category", "Report Status"]}
        actionBtnNumbers={1}
      >
        {participatedSurveys &&
          participatedSurveys.map((singleSurvey, index) => (
            <ReportedSurveyRow
              index={index}
              key={singleSurvey._id}
              singleSurvey={singleSurvey}
            />
          ))}
      </TableViewStructure>
    </InitialPageStructure>
  );
};

export default ReportedSurveys;
