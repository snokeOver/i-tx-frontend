import PageHelmet from "../../shared/PageHelmet";
import Container from "../../shared/Container";
import PageTitle from "../../shared/PageTitle";
import GoToTopBtn from "../../shared/GoToTopBtn";
import { Link } from "react-router-dom";
import PrimaryButton from "../../shared/PrimaryButton";
import TableSkeleton from "../../shared/TableSkeleton";
import CardSkeleton from "../../shared/CardSkeleton";

const InitialPageStructure = ({
  pageName,
  pageTitle,
  error,
  isPending,
  data,
  emptyDataMsg,
  direction,
  totalName,
  customSkeleton = "",
  children,
}) => {
  return (
    <>
      <PageHelmet pageName={pageName} />
      <Container>
        {pageTitle && <PageTitle title={pageTitle} />}

        <div className=" rounded-lg bg-base-100 pb-5 md:pb-10">
          <div className="text-center flex-col">
            {/* Handle error */}
            {error && <div>Error: {error.message}</div>}

            {/* Handle pending time */}
            {isPending ? (
              customSkeleton === "Card" ? (
                <CardSkeleton />
              ) : (
                <TableSkeleton />
              )
            ) : (
              <>
                {emptyDataMsg && (
                  <div className="text-center py-2">
                    {data && data.length < 1 && (
                      <>
                        <h1 className="text-xl lg:text-4xl font-bold py-10">
                          {emptyDataMsg}
                        </h1>
                        {direction && (
                          <div className="text-center text-lg mb-5" colSpan="6">
                            <span className="mr-3">To add {pageName}</span>
                            <span className="inline-block">
                              <Link to={direction}>
                                <PrimaryButton text="Click Here" />
                              </Link>
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}

                {totalName && (
                  <>
                    {/* heading section */}
                    <div className=" flex  items-center w-[90%] mx-auto gap-x-3 my-4">
                      <h2 className="text-lg  font-medium ">Total</h2>

                      <span className="px-3 py-1 text-xs text-gray-900 bg-blue-100 rounded-xl">
                        <span className="rounded-full border border-sky-400 font-semibold text-md px-1 bg-sky-400">
                          {data.length}
                        </span>
                        <span className="ml-1"> {totalName} (s)</span>
                      </span>
                    </div>
                  </>
                )}

                {/* Body part and it will take the children */}
                {children}
              </>
            )}
          </div>
        </div>
      </Container>

      <GoToTopBtn />
    </>
  );
};

export default InitialPageStructure;
