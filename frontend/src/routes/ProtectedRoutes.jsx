import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoutes({
  children,
  roles,
}) {
  const {
    token,
    role,
  } = useContext(AuthContext);
  if (!token) {
    return <Navigate to="/" />;
  }
  if (
    roles &&
    !roles.includes(role)
  ) {
    return (
      <Navigate
        to="/dashboard"
      />
    );
  }
  return children;
}

export default ProtectedRoutes;