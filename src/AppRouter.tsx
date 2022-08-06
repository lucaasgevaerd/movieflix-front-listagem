import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import NonExistentRoutes from "./NonExistentRoutes";
import Login from "./pages/Login";
import MovieId from "./pages/MovieId";
import Movies from "./pages/Movies";
import { isAuthenticated } from "./util/requests";

const AppRouter = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {isAuthenticated() ? (
        <Route path="/movies" element={<PrivateRoute />}>
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieId />} />
        </Route>
        ) : (
          <Route path="/" element={<Login />} />
        )}
        <Route path="*" element={<NonExistentRoutes />} />
      </Routes>
    </>
  );
};

export default AppRouter;
