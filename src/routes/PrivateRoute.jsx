import { Navigate, useLocation } from "react-router-dom";
import PageSkeleton from "../components/shared/PageSkeleton";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <PageSkeleton />;
  if (user) return children;
  return <Navigate state={location.pathname} to="/login" />;
};

export default PrivateRoute;
