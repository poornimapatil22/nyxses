import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getallsharedapplications, searchapplication } from "../api/Sharedapplication";



export const fetchallsharedapplications = createAsyncThunk(
    "sharedapplication/getallsharedapplications",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await getallsharedapplications();
            return data;
        } catch (e) {
            return rejectWithValue(
                e?.response?.data ?? { message: e.message || "Request failed" }
            );
        }
    }
);

export const fetchsearchapplication = createAsyncThunk(
    "sharedapplication/searchapplication",
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await searchapplication(payload);
            return data;
        } catch (e) {
            return rejectWithValue(
                e?.response?.data ?? { message: e.message || "Request failed" }
            );
        }
    }
);


const sharedapplicationSlice = createSlice({
    name: "sharedapplication",
    initialState: {
        sharedapplication: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchallsharedapplications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchallsharedapplications.fulfilled, (state, action) => {
                state.loading = false;
                state.sharedapplication = action.payload;
            })
            .addCase(fetchallsharedapplications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchsearchapplication.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchsearchapplication.fulfilled, (state, action) => {
                state.loading = false;
                state.sharedapplication = action.payload;
            })
            .addCase(fetchsearchapplication.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});


export default sharedapplicationSlice.reducer;

export const selectsharedapplication = (state) => state.sharedapplication.sharedapplication;
export const selectsharedapplicationloading = (state) => state.sharedapplication.loading;
export const selectsharedapplicationerror = (state) => state.sharedapplication.error;