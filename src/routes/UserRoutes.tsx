import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";

import Shoppage from "../pages/Shoppage";

function UserRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/shop" element={<Shoppage />} />
      </Routes>
    </>
  );
}

export default UserRoutes;
