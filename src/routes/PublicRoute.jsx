import { Navigate } from "react-router-dom";
import PageSkeleton from "../components/shared/PageSkeleton";
import useAuth from "../hooks/useAuth";

const PublicRoute = ({ children }) => {
  const { user, loading, regiSuccess } = useAuth();

  if (loading) return <PageSkeleton />;
  if (!user || regiSuccess) return children;
  return <Navigate to="/" />;
};

export default PublicRoute;
