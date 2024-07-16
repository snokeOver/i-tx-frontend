import { Helmet } from "react-helmet-async";
import useData from "../../hooks/useData";

const PageHelmet = ({ pageName }) => {
  const { siteName } = useData();
  return (
    <Helmet>
      <title>
        {pageName} | {siteName}
      </title>
    </Helmet>
  );
};

export default PageHelmet;
