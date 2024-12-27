import { useContext } from "react";
import { AuthContext } from "./context";

export const useAuthProvider = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error(
      "No AuthContext was provided. Your component must be wrapped in an <AuthenticationProvider> component."
    );
  }
  return authContext;
};
