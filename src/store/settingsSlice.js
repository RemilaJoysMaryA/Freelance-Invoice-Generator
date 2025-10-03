import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: { profile: {} },
  reducers: {
    updateProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { updateProfile } = settingsSlice.actions;
export default settingsSlice.reducer;
