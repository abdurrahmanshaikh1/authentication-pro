import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return null; 

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
