import useAuth from "../../../hooks/useAuth";
import useData from "../../../hooks/useData";
import useUpdateData from "../../../hooks/useUpdateData";
import ActionButton from "../../shared/ActionButton";
import Container from "../../shared/Container";
import PageHelmet from "../../shared/PageHelmet";
import PageTitle from "../../shared/PageTitle";

const RequestForSurveyor = () => {
  const { userDetails } = useAuth();
  const { setToastMsg } = useData();
  const { userRole, userRequest } = userDetails;

  const updateSurveyResponse = useUpdateData();

  const hadleBecomeSurveyorBtn = async () => {
    // send API request to update the request to become Surveyor
    if (userRole !== "User") {
      return setToastMsg("err, You are not allowed!");
    }

    const payload = {
      userRequest: "Requested",
    };
    // id to target, name, apiName, payload, skipModal, querryToInvalid
    await updateSurveyResponse(
      userDetails._id,
      "Status",
      "user-request",
      payload,
      "noSkip",
      ["single-survey"]
    );
  };
  return (
    <>
      <PageHelmet pageName="User Request" />
      <Container>
        <PageTitle title="Request To Become A Surveyor" />
        <div className="mx-auto">
          <div className="card w-full shadow-2xl bg-base-100 py-10">
            {userRole === "User" && !userRequest && (
              <div
                onClick={hadleBecomeSurveyorBtn}
                className=" w-3/4 lg:w-1/2 mx-auto"
              >
                <ActionButton buttonText="Allow Me To Be A Surveyor" />
              </div>
            )}

            {userRole === "User" && userRequest === "Requested" && (
              <div className=" w-[90%] md:w-3/4 xl:w-1/2 mx-auto">
                <div className="text-primary border border-gray-300 dark:border-gray-700 p-6 rounded-2xl text-center text-xl ">
                  <p> You request to be a Surveyor is pending.</p>
                  <p className="mt-3">Please wait for Admin confirmation.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default RequestForSurveyor;
