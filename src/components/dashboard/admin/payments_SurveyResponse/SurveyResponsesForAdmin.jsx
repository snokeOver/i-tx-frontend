import { useParams } from "react-router-dom";
import SingleResponseRow from "../../surveyor/SingleResponseRow";
import useGetData from "../../../../hooks/useGetData";
import InitialPageStructure from "../../shared/InitialPageStructure";
import TableViewStructure from "../../shared/TableViewStructure";
import { useEffect, useState } from "react";
import ChartViewStructure from "../../shared/ChartViewStructure";
import ToggleBtn from "../../shared/ToggleBtn";

const SurveyResponsesForAdmin = () => {
  const { id } = useParams();
  const [toggle, setToggle] = useState(false);

  const {
    data: surveyResponse,
    isPending,
    error,
  } = useGetData({ apiRoute: "survey-response", dataId: id });

  const toggleHandler = (e) => {
    setToggle(e.target.checked);
  };

  const [chartData, setChartData] = useState([
    { name: "Yes", value: 0 },
    { name: "No", value: 0 },
    { name: "Like", value: 0 },
    { name: "Dislike", value: 0 },
    { name: "Comment", value: 0 },
    { name: "Reported", value: 0 },
  ]);

  // Set the data accordingly
  useEffect(() => {
    if (surveyResponse?.userResponses) {
      let totalYes = 0,
        totalNo = 0,
        totalLike = 0,
        totalDislike = 0,
        totalComment = 0,
        totalReport = 0;

      surveyResponse?.userResponses?.forEach((response) => {
        if (response.comment) totalComment++;
        if (response.vote === "YES") totalYes++;
        if (response.vote === "NO") totalNo++;
        if (response.preference === "LIKE") totalLike++;
        if (response.preference === "DISLIKE") totalDislike++;
        if (response.reportStatus === "Reported") totalReport++;
      });

      setChartData([
        { name: "Yes", value: totalYes },
        { name: "No", value: totalNo },
        { name: "Like", value: totalLike },
        { name: "Dislike", value: totalDislike },
        { name: "Comment", value: totalComment },
        { name: "Reported", value: totalReport },
      ]);
    }
  }, [surveyResponse?.userResponses]);

  return (
    <InitialPageStructure
      pageName="Survey Response"
      pageTitle="All Responses For This Survey"
      error={error}
      isPending={isPending}
      data={surveyResponse?.userResponses || []}
      emptyDataMsg="No Responses From Users Yet!"
      totalName="Response"
    >
      {/* Toggle button */}
      <div className="max-w-lg mx-auto my-4">
        <ToggleBtn
          toggle={toggle}
          toggleHandler={toggleHandler}
          firstText="Tavle View"
          secondText="Chart View"
        />
      </div>

      {!toggle ? (
        <>
          {/* Table section */}
          <TableViewStructure
            data={surveyResponse?.userResponses || []}
            tabCols={[
              "Email",
              "Name",
              "Vote",
              "Preferences",
              "Comment",
              "Report Status",
            ]}
            actionBtnNumbers={0}
          >
            {surveyResponse?.userResponses?.length > 0 &&
              surveyResponse?.userResponses.map((singleResponse, index) => (
                <SingleResponseRow
                  index={index}
                  key={singleResponse.email}
                  singleResponse={singleResponse}
                />
              ))}
          </TableViewStructure>
        </>
      ) : (
        <>
          {" "}
          {/* Chart View Structure */}
          <div className="flex items-center justify-center">
            <ChartViewStructure data={chartData} />
          </div>
        </>
      )}
    </InitialPageStructure>
  );
};

export default SurveyResponsesForAdmin;
