import { configureStore } from "@reduxjs/toolkit";
import reminder from "./features/reminder";
import weatherSlice from "./features/weather";

export const store = configureStore({
  reducer: {
    reminder: reminder,
    weather: weatherSlice,
  },
});
