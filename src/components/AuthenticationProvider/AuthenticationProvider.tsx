import React, { useCallback, useMemo, useState } from "react";
import { AuthContext } from "../../utils/auth";
import { Navigate } from "react-router-dom";

export interface AuthenticationProviderProps {
  children?: React.ReactNode;
}

export const AuthenticationProvider = ({
  children,
}: AuthenticationProviderProps) => {
  const [user, setUser] = useState<any>("undefined");
  const [token, setToken] = useState<string | undefined | null>(
    localStorage.getItem("token")
  );
  const [error, setError] = useState<string | undefined>(undefined);

  const isAuthenticated = !!token;

  const signout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  }, []);

  const context = useMemo(
    () => ({
      user,
      token,
      isAuthenticated,
      error,
      signout,
    }),
    [user, token, isAuthenticated, error]
  );

  console.log(context);
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
