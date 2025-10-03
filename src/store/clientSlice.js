import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async CRUD example
export const fetchClients = createAsyncThunk(
  "clients/fetchClients",
  async () => {
    const response = await axios.get("http://localhost:5000/api/clients");
    return response.data;
  }
);

const clientsSlice = createSlice({
  name: "clients",
  initialState: { list: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default clientsSlice.reducer;
