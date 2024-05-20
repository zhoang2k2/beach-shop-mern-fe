import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";

export interface ColorType {
  _id: string;
  name: string;
  color_id: string;
}

export interface ColorState {
  colors: ColorType[];
  status: string;
}

const initialState = {
  colors: [],
  status: "IDLE",
};

export const fetchColors = createAsyncThunk("colors/fetch", async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/colors");
    return response.data;
  } catch (error) {
    console.error("Fail to fetch colors: ", error);
  }
});

const colorSlice = createSlice({
    name: "color",
    initialState,
    reducers: {},
    extraReducers:  (builder) => {
        builder
          .addCase(fetchColors.fulfilled, (state, action) => {
            if (action.payload) {
              state.colors = action.payload;
              state.status === "SUCCESS";
            }
          })
          .addCase(fetchColors.pending, (state) => {
            state.status = "LOADING";
          })
          .addCase(fetchColors.rejected, (state) => {
            state.status = "FAIL";
          });
      },
})

export default colorSlice
export const selectColorState = (state: RootState) => state.colors