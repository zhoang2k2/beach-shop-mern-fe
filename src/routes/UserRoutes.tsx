import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import type { ProductType } from "../redux/reducers/productSlice";
import type { CategoryType } from "../redux/reducers/categorySlice";
import type { SizeType } from "../redux/reducers/sizeSlice";
import type { ColorType } from "../redux/reducers/colorSlice";
import Shoppage from "../pages/Shoppage";

export type UserRoutesProps = {
  products: ProductType[];
  categories: CategoryType[];
  sizes: SizeType[];
  colors: ColorType[];
};

function UserRoutes({ ...props }: UserRoutesProps) {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              products={props.products}
              categories={props.categories}
              sizes={props.sizes}
            />
          }
        />

        <Route
          path="/shop"
          element={
            <Shoppage
              products={props.products}
              categories={props.categories}
              sizes={props.sizes}
            />
          }
        />
      </Routes>
    </>
  );
}

export default UserRoutes;
