import PageHelmet from "../../shared/PageHelmet";
import Container from "../../shared/Container";
import GoToTopBtn from "../../shared/GoToTopBtn";

const InitialTxStructure = ({ pageName, dashboard, children }) => {
  return (
    <>
      <PageHelmet pageName={pageName} />

      <Container dashboard={dashboard}>
        <div className=" rounded-lg pb-5 md:pb-10 flex flex-col items-center justify-center mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10  w-full mx-auto">
            {children}
          </div>
        </div>
      </Container>

      <GoToTopBtn />
    </>
  );
};

export default InitialTxStructure;
