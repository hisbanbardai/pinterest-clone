import axios from "axios";
import { useEffect, useState } from "react";

export default function useAuthentication() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/auth`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        if (!data.valid) {
          setIsAuthenticated(false);
        } else if (data.valid && data.userId) {
          setIsAuthenticated(true);

          localStorage.setItem("userId", data.userId);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setIsAuthenticated(false);
      });
  }, []);

  return { isAuthenticated };
}
