import DynamicNavLinks from "./DynamicNavLinks";
import { BsGraphUp } from "react-icons/bs";
import { MdHomeWork } from "react-icons/md";
import { FcSurvey, FcFeedback } from "react-icons/fc";

const SurveyorMenus = () => {
  return (
    <>
      {/* Statistics */}
      <DynamicNavLinks
        address="/dashboard/surveyor"
        name="Surveyor Statistics"
        icon={BsGraphUp}
      />

      {/* Create a survey */}
      <DynamicNavLinks
        address="/dashboard/surveyor/create"
        name="Create Survey"
        icon={FcSurvey}
      />

      {/* My Surveys */}
      <DynamicNavLinks
        address="/dashboard/surveyor/surveys"
        name="My Survey(s)"
        icon={MdHomeWork}
      />

      {/* Admin Feedbacks */}
      <DynamicNavLinks
        address="/dashboard/surveyor/feedbacks"
        name="Admin Feedbacks"
        icon={FcFeedback}
      />
    </>
  );
};

export default SurveyorMenus;
