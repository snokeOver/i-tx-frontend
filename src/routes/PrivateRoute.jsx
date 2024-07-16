import { Navigate, useLocation } from "react-router-dom";
import PageSkeleton from "../components/shared/PageSkeleton";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { userDetails, loading } = useAuth();
  const location = useLocation();

  if (loading) return <PageSkeleton />;
  if (userDetails) return children;
  return <Navigate state={location.pathname} to="/login" />;
};

export default PrivateRoute;
