import { createContext } from "react";

export interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  token: string | undefined | null;
  signout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
