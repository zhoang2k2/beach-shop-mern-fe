import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";

export interface ProductType {
  _id: string;
  name: string;
  description: string;
  price: number;
  category_id: string;
  brand: string;
  stock: number;
  sizes: [string];
  colors: [string];
  images: [string];
  rating: number;
  reviews: [string];
}

interface ProductState {
  products: ProductType[];
  status: string;
}

const initialState: ProductState = {
  products: [],
  status: "IDLE",
};

export const fetchProducts = createAsyncThunk("product/fetch", async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/products");
    return response.data;
  } catch (error) {
    console.error("Fail to fetch products: ", error);
  }
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        if (action.payload) {
          state.products = action.payload;
          state.status === "SUCCESS";
        }
      })
      .addCase(fetchProducts.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "FAIL";
      });
  },
});

export default productSlice;
export const selectProductState = (state: RootState) => state.products;
