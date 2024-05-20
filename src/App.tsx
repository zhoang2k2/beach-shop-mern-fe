import "./App.css";
import UserFooter from "./components/user/footer/Footer";
import UserNavbar from "./components/user/navbar/Navbar";
import UserRoutes from "./routes/UserRoutes";
import "./styles/_main.scss";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectProductState,
} from "./redux/reducers/productSlice.ts";
import { useEffect } from "react";
import {
  fetchCategory,
  selectCategoryState,
} from "./redux/reducers/categorySlice.ts";
import { fetchSizes, selectSizeState } from "./redux/reducers/sizeSlice.ts";
import { fetchColors, selectColorState } from "./redux/reducers/colorSlice.ts";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const { products } = useSelector(selectProductState);
  const { categories } = useSelector(selectCategoryState);
  const { sizes } = useSelector(selectSizeState);
  const { colors } = useSelector(selectColorState);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategory());
    dispatch(fetchSizes());
    dispatch(fetchColors());
  }, [dispatch]);

  return (
    <div className="App">
      <UserNavbar />
      <UserRoutes
        products={products}
        categories={categories}
        sizes={sizes}
        colors={colors}
      />
      <UserFooter />
    </div>
  );
}

export default App;
