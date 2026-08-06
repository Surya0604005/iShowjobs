import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const admin = localStorage.getItem("admin");

  if (!admin) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}

export default ProtectedRoute;
