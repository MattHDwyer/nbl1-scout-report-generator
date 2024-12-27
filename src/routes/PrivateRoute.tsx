import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../utils/auth";

export const PrivateRoute = ({ children }: any) => {
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext?.isAuthenticated ?? false;
  return isAuthenticated ? children : <Navigate to="/login" />;
};
