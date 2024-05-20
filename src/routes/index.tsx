import { Route, Routes } from "react-router-dom";
import UserRoutes, { type UserRoutesProps } from "./UserRoutes";

type AppProps = {
  userRouterProps: UserRoutesProps;
};

function AppRoute({ userRouterProps }: AppProps) {
  return (
    <Routes>
      <Route path="/*" element={<UserRoutes {...userRouterProps} />} />
    </Routes>
  );
}

export default AppRoute;
