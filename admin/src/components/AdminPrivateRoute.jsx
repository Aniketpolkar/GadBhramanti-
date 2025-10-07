import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminAuthContext } from "../context/AdminAuthContext";

const AdminPrivateRoute = ({ children }) => {
  const { admin, loading } = useContext(AdminAuthContext);

  if (loading) return <div>Loading...</div>;

  return admin ? children : <Navigate to="/login" />;
};

export default AdminPrivateRoute;
