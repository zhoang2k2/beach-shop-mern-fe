import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";

export interface CustomerType {
  username: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  gender: string;
}

export interface CustomerState {
  customers: CustomerType[];
  status: string;
}

const initialState: CustomerState = {
  customers: [],
  status: "IDLE",
};

export const fetchCustomers = createAsyncThunk("customers/fetch", async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/customers");
    return response.data;
  } catch (error) {
    console.error("fail to fetch customers: ", error);
  }
});

export const addNewCustomer = createAsyncThunk(
  "customers/add",
  async (newCustomer: CustomerType) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/customers",
        newCustomer
      );
      return response.data;
    } catch (error) {
      console.error("fail to add new customer: ", error);
    }
  }
);

const CustomerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        if (action.payload) {
          state.customers = action.payload;
          state.status === "SUCCESS";
        }
      })
      .addCase(fetchCustomers.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(fetchCustomers.rejected, (state) => {
        state.status = "FAIL";
      })

      // ADDING
      .addCase(addNewCustomer.fulfilled, (state, action) => {
        if (action.payload) {
          state.customers.push(action.payload);
          state.status === "SUCCESS";
        }
      })
      .addCase(addNewCustomer.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(addNewCustomer.rejected, (state) => {
        state.status = "FAIL";  
      });
  },
});

export default CustomerSlice;
export const selectCustomerState = (state: RootState) => state.customers;
