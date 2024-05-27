import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";

export interface SizeType {
  _id: string;
  name: string;
  size_id: string;
}

export interface SizeState {
  sizes: SizeType[];
  status: string;
}

const initialState = {
  sizes: [],
  status: "IDLE",
};

export const fetchSizes = createAsyncThunk("sizes/fetch", async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/sizes");
    return response.data;
  } catch (error) {
    console.error("Fail to fetch sizes: ", error);
  }
});

const sizeSlice = createSlice({
  name: "sizes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSizes.fulfilled, (state, action) => {
        if (action.payload) {
          state.sizes = action.payload;
          state.status === "SUCCESS";
        }
      })
      .addCase(fetchSizes.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(fetchSizes.rejected, (state) => {
        state.status = "FAIL";
      });
  },
});

export default sizeSlice;
export const selectSizeState = (state: RootState): SizeState => state.sizes;
