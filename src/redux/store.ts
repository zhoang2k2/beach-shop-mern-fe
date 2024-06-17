import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./reducers/productSlice";
import categorySlice from "./reducers/categorySlice";
import sizeSlice from "./reducers/sizeSlice";
import colorSlice from "./reducers/colorSlice";
import CustomerSlice from "./reducers/customerSlice";

const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    categories: categorySlice.reducer,
    sizes: sizeSlice.reducer,
    colors: colorSlice.reducer,
    customers: CustomerSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
