import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function useAuthentication() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      "You are trying to use user context value in a component that is not wrapped by the UserContextProvider"
    );
  }

  return context;
}
