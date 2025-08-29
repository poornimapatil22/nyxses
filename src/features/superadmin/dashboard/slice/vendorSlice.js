import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {fetchallcustomers, filterCustomer} from './../api/super.dashboard.api';


/* 1) Fetch all customers */
export const fetchAllCustomers = createAsyncThunk(
    "vendor/fetchAllCustomers",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await fetchallcustomers();
        return data.data;
      } catch (e) {
        const msg =
          e?.response?.data?.message ||
          e.message ||
          "Fetching all customers failed";
        return rejectWithValue(msg);
      }
    }
    );

/* 2) Filter customers */
export const filterCustomers = createAsyncThunk(
    "vendor/filterCustomers",
    async (payload, { rejectWithValue }) => {
      try {
        const { data } = await filterCustomer(payload);
        return data.data;
      } catch (e) {
        const msg =
          e?.response?.data?.message ||
          e.message ||
          "Filtering customers failed";
        return rejectWithValue(msg);
      }
    }
    );

export const totalvendors = createAsyncThunk(
    "vendor/totalvendor",
    async (payload, {rejectWithValue})=>{
      try{
        const {data} = await filterCustomer(payload);
        return data.data;
      }catch(e){
        const msg = "sorry";
        return rejectWithValue(msg);
      }
    }
)

    const initialState = {
        customers: [],
        filter: null,
        totalvendors: 0,
        vendor_loading: false,
        error: null,

      };

    const vendorSlice = createSlice({
        name: "vendor",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
          builder
            // fetch all customers
            .addCase(fetchAllCustomers.pending, (state) => {
              state.vendor_loading = true;
              state.error = null;
            })
            .addCase(fetchAllCustomers.fulfilled, (state, action) => {
              state.vendor_loading = false;
              state.customers = action.payload;
            })
            .addCase(fetchAllCustomers.rejected, (state, action) => {
              state.vendor_loading = false;
              state.error = action.payload || "Failed to fetch customers";
            })
            // filter customers
            .addCase(filterCustomers.pending, (state) => {
              state.vendor_loading = true;
              state.error = null;
            })
            .addCase(filterCustomers.fulfilled, (state, action) => {
              state.vendor_loading = false;
              state.customers = action.payload;
            })
            .addCase(filterCustomers.rejected, (state, action) => {
              state.vendor_loading = false;
              state.error = action.payload || "Failed to filter customers";
            })
            // totalvendors
            .addCase(totalvendors.pending,(state)=>{
              state.vendor_loading = true;
              state.error = null;
            })
            .addCase(totalvendors.fulfilled,(state,action)=>{
              state.vendor_loading = false;
              state.error = null;
              state.totalvendors = action.payload;
            })
            .addCase(totalvendors.rejected,(state,action)=>{
              state.vendor_loading = false;
              state.error = action.payload || "failed";
            });
        },
        });


// selectors
export const selectAllCustomers = (state) => state.vendor.customers;
export const selectVendorLoading = (state) => state.vendor.vendor_loading;
export const selectVendorError = (state) => state.vendor.error;
export const selectVendorFilter = (state) => state.vendor.filter;
export const selecttotalvendor = (state) => state.vendor.totalvendors;

export default vendorSlice.reducer;