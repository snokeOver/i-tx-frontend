import FeaturedOptions from "../components/home/FeaturedOptions";
import PageHelmet from "../components/shared/PageHelmet";
import { goToTop } from "../helper/goToTop";

const Home = () => {
  return (
    <>
      {goToTop()}
      <div className="w-full overflow-hidden">
        <PageHelmet pageName="Home" />

        <div className="md:container mx-auto">
          <FeaturedOptions />
        </div>
      </div>
    </>
  );
};

export default Home;
