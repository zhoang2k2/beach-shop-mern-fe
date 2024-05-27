import { Route, Routes } from "react-router-dom";
import UserRoutes from "./UserRoutes";

function AppRoute() {
  return (
    <Routes>
      <Route path="/*" element={<UserRoutes />} />
    </Routes>
  );
}

export default AppRoute;
