import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import NonExistentRoutes from "./NonExistentRoutes";
import Login from "./pages/Login";
import MovieId from "./pages/MovieId";
import Movies from "./pages/Movies";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<PublicRoute />}>
          <Route path="/" element={<Login />} />
        </Route>
        <Route path="/movies" element={<PrivateRoute />}>
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/1" element={<MovieId id={1} />} />
          <Route path="/movies/2" element={<MovieId id={2} />} />
        </Route>
        <Route path="*" element={<NonExistentRoutes />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
