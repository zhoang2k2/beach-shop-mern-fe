import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";

import Shoppage from "../pages/Shoppage";
import Aboutpage from "../pages/Aboutpage";

function UserRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/shop/*" element={<Shoppage />}>
          <Route path="best-seller" element={<Shoppage />} />
          <Route path="cheap-price" element={<Shoppage />} />
        </Route>
        <Route path="/about" element={<Aboutpage />} />
      </Routes>
    </>
  );
}

export default UserRoutes;
