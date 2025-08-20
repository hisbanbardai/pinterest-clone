import axios from "axios";
import { useEffect, useState } from "react";
import type { TUser } from "../lib/types";
import { UserContext } from "./UserContext";

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [currentUser, setCurrentUser] = useState<TUser | null>(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/auth`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        if (!data.valid) {
          setIsAuthenticated(false);
        } else if (data.valid && data.user) {
          setIsAuthenticated(true);
          setCurrentUser(data.user);

          // localStorage.setItem("userId", data.userId);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setIsAuthenticated(false);
      });
  }, []);

  function handleLogin(userData: TUser) {
    setCurrentUser(userData);
    setIsAuthenticated(true);
  }

  function handleLogout() {
    setCurrentUser(null);
    setIsAuthenticated(false);
  }

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
