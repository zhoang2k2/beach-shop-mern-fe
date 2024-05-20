import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import type { ProductType } from "../redux/reducers/productSlice";
import type { CategoryType } from "../redux/reducers/categorySlice";
import type { SizeType } from "../redux/reducers/sizeSlice";
import type { ColorType } from "../redux/reducers/colorSlice";

export type UserRoutesProps = {
  products: ProductType[];
  categories: CategoryType[];
  sizes: SizeType[];
  colors: ColorType[]
};

function UserRoutes({ products, categories, sizes, colors }: UserRoutesProps) {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              products={products}
              categories={categories}
              sizes={sizes}
              colors={colors}
            />
          }
        />
      </Routes>
    </>
  );
}

export default UserRoutes;
