import InitialPageStructure from "../shared/InitialPageStructure";
import useGetData from "../../../hooks/useGetData";
import SurveyRow from "./SurveyRow";
import TableViewStructure from "../shared/TableViewStructure";

const ParticipatedSurveys = () => {
  const {
    data: participatedSurveys,
    isPending,
    error,
  } = useGetData({ apiRoute: "participated-surveys" });

  return (
    <InitialPageStructure
      pageName="Participated Surveys"
      pageTitle="All My Participated Surveys"
      error={error}
      isPending={isPending}
      data={participatedSurveys || []}
      emptyDataMsg="You didn't participated any survey yet!"
      direction={`/`}
      totalName="Participated Survey"
    >
      {/* Table section */}
      <TableViewStructure
        data={participatedSurveys || []}
        tabCols={["Title", "Vote", "Preferences", "Comment"]}
        actionBtnNumbers={1}
      >
        {participatedSurveys.map((singleSurvey, index) => (
          <SurveyRow
            index={index}
            key={singleSurvey._id}
            singleSurvey={singleSurvey}
          />
        ))}
      </TableViewStructure>
    </InitialPageStructure>
  );
};

export default ParticipatedSurveys;
