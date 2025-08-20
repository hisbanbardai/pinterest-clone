import { createContext } from "react";
import type { TUser } from "../lib/types";

type TUserContext = {
  isAuthenticated: boolean | null;
  currentUser: TUser | null;
  handleLogin: (userData: TUser) => void;
  handleLogout: () => void;
};

export const UserContext = createContext<TUserContext | null>(null);
