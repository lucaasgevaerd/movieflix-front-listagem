import { Navigate, Route, Routes } from "react-router-dom";
import { isAuthenticated } from "./util/requests";

const NonExistentRoutes = () => {
  return (
    <>
    <Routes>
      {isAuthenticated() ? (
        <Route path="*" element={<Navigate to="/movies" replace />} />
      ) : (
        <Route path="*" element={<Navigate to="/" replace />} />
      )}
    </Routes>
    </>
  );
};

export default NonExistentRoutes;
