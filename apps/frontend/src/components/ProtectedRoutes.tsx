import { Navigate, Outlet } from "react-router";
import useAuthentication from "../hooks/useAuthentication";
import { Loader } from "./Loader";

export default function ProtectedRoutes() {
  const { isAuthenticated } = useAuthentication();

  if (isAuthenticated === null) {
    return <Loader />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={"/signin"} replace />;
}
