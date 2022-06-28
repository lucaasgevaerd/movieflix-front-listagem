import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../util/requests";

const PublicRoute = () => {
  return !isAuthenticated() ? <Outlet /> : <Navigate to="/movies" />;
};

export default PublicRoute;