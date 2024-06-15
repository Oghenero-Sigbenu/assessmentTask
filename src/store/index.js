import { configureStore } from "@reduxjs/toolkit";
import reminder from "./features/reminder";

export const store = configureStore({
  reducer: {
    reminder: reminder,
  },
});
