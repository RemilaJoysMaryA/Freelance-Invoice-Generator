import { configureStore } from "@reduxjs/toolkit";
import clientsReducer from "./clientSlice";
import invoicesReducer from "./invoicesSlice";
import settingsReducer from "./settingsSlice";

const store = configureStore({
  reducer: {
    clients: clientsReducer,
    invoices: invoicesReducer,
    settings: settingsReducer,
  },
});

export default store;
