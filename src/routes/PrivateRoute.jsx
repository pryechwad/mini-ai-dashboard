import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" />;

  if (adminOnly && user.email !== "superadmin@test.com") {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default PrivateRoute;
