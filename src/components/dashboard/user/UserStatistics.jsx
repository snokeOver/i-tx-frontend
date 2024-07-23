import useAuth from "../../../hooks/useAuth";
import Container from "../../shared/Container";
import PageHelmet from "../../shared/PageHelmet";

const UserStatistics = () => {
  const { userDetails } = useAuth();

  return (
    <>
      <PageHelmet pageName="Agent Dashboard" />
      <Container>
        <div className=" rounded-lg bg-base-100 pb-5 md:pb-10">
          <div className="text-center flex-col py-10">
            {userDetails.status === "Pending" && (
              <h2 className="text-prime text-2xl">
                Your status is pending ! <br /> All functionality might not work
                properly !
              </h2>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default UserStatistics;
