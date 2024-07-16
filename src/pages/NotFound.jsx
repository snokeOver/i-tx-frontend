import { NavLink } from "react-router-dom";

import PageHelmet from "../components/shared/PageHelmet";
import PrimaryButton from "../components/shared/PrimaryButton";
import Container from "../components/shared/Container";
const NotFound = () => {
  return (
    <>
      <PageHelmet pageName="Not Found" />
      <Container>
        <div className="hero  rounded-lg bg-base-200 min-h-screen">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <div>
                <img
                  className=""
                  src="https://i.ibb.co/cY9kysS/404.png"
                  alt=""
                />
              </div>

              <h3 className="text-5xl font-bold -mt-10">Not Found</h3>

              <p className="py-6">
                The page your are looking for was not found!
              </p>

              <NavLink to="/">
                <PrimaryButton text="Go Home" />
              </NavLink>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default NotFound;
