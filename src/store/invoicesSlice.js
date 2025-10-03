import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch invoices from API
export const fetchInvoices = createAsyncThunk(
  "invoices/fetchInvoices",
  async () => {
    const response = await axios.get("https://freelance-invoice-generator.onrender.com/api/invoices");
    return Array.isArray(response.data) ? response.data : []; // ensure array
  }
);

// Delete invoice by ID
export const deleteInvoice = createAsyncThunk(
  "invoices/deleteInvoice",
  async (id) => {
    await axios.delete(`https://freelance-invoice-generator.onrender.com/api/invoices/${id}`);
    return id; // return deleted invoice id
  }
);

const invoicesSlice = createSlice({
  name: "invoices",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch invoices
      .addCase(fetchInvoices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Delete invoice
      .addCase(deleteInvoice.fulfilled, (state, action) => {
        state.list = state.list.filter((invoice) => invoice._id !== action.payload);
      });
  },
});

export default invoicesSlice.reducer;
