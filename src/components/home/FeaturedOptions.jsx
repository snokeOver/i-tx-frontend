import { Link } from "react-router-dom";
import useGetPublicData from "../../hooks/useGetPublicData";
import CardSkeleton from "../shared/CardSkeleton";
import Container from "../shared/Container";
import PageTitle from "../shared/PageTitle";
import SurveyCard from "../shared/cards/SurveyCard";

const FeaturedOptions = () => {
  // const {
  //   data: latestSurveys,
  //   isPending,
  //   error,
  // } = useGetPublicData({ apiRoute: "recent-surveys" });
  const isPending = false;
  return (
    <Container>
      <PageTitle
        title="Featured Options"
        subTitle="Our country's most secure,trusted and fastest mobile financial service"
      />
      {/* Will make a custom error message component*/}
      {/* {error && <div>Error: {error.message}</div>} */}
      {isPending ? (
        <CardSkeleton />
      ) : (
        <div
          id="latest_section"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10 px-5 group mt-2 md:mt-10"
        >
          {/* {latestSurveys.map((survey) => (
            <SurveyCard key={survey._id} survey={survey} />
          ))} */}
          <Link className="px-3 py-1 rounded-lg" to={"/login"}>
            Login
          </Link>
        </div>
      )}
    </Container>
  );
};

export default FeaturedOptions;
