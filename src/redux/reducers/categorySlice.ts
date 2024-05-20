import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";

export interface CategoryType {
  _id: string;
  name: string;
  description: string;
  category_id: string;
}

export interface CategoryState {
  categories: CategoryType[];
  status: string;
}

const initialState = {
  categories: [],
  status: "IDLE",
};

export const fetchCategory = createAsyncThunk("category/fetch", async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/categories");
    return response.data;
  } catch (error) {
    console.error("Fail to fetch categories: ", error);
  }
});

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.fulfilled, (state, action) => {
        if (action.payload) {
          state.categories = action.payload;
          state.status === "SUCCESS";
        }
      })
      .addCase(fetchCategory.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(fetchCategory.rejected, (state) => {
        state.status = "FAIL";
      });
  },
});

export default categorySlice;
export const selectCategoryState = (state: RootState) => state.categories;
