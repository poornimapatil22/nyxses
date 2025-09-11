import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCustomer } from "../api/Customerapi";

export const getallcustomers = createAsyncThunk(
  "dashboard/getCustomer",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getAllCustomer();
      console.log("all cust data",data);
      return data;

    } catch (e) {
      return rejectWithValue(e?.response?.data ?? { message: e.message || "Request failed" });
    }
  }
);

export const getfilteredcustomers = createAsyncThunk(
  "dashboard/getfilteredCustomer",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await getAllCustomer(payload);
      return data;
    } catch (e) {
      return rejectWithValue(e?.response?.data ?? { message: e.message || "Request failed" });
    }
  }
);

const Customerslice = createSlice({
  name: "customers",
  initialState: {
    customers: null,
    filteredcustomers: null,
    loading: false,
    error: null,
  },
  extraReducers: (b) => {
    b.addCase(getallcustomers.pending, (s) => {
      s.loading = true; s.error = null;
    })
     .addCase(getallcustomers.fulfilled, (s, { payload }) => {
       s.loading = false; s.customers = payload;
     })
     .addCase(getallcustomers.rejected, (s, { payload }) => {
       s.loading = false; s.error = payload;
     });

    b.addCase(getfilteredcustomers.pending, (s) => {
      s.loading = true; s.error = null;
    })
     .addCase(getfilteredcustomers.fulfilled, (s, { payload }) => {
       s.loading = false; s.filteredcustomers = payload;
     })
     .addCase(getfilteredcustomers.rejected, (s, { payload }) => {
       s.loading = false; s.error = payload;
     });
  },
});

export default Customerslice.reducer;

// ✅ fixed selectors
export const selectallcustomer       = (s) => s.customers.customers;
export const selectfilteredcustomer  = (s) => s.customers.filteredcustomers;
export const selectcustomerloading   = (s) => s.customers.loading;
export const selectcustomererror     = (s) => s.customers.error;
