import { Navigate, Outlet } from "react-router";
import { Loader } from "./Loader";
import useAuthentication from "../hooks/useAuthentication";

export default function PublicRoutes() {
  const { isAuthenticated } = useAuthentication();

  if (isAuthenticated === null) {
    return <Loader />;
  }

  return !isAuthenticated ? <Outlet /> : <Navigate to={"/"} replace />;
}
