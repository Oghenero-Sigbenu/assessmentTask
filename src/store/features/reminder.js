import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  neewUserReminder: {},
  userReminders: [],
  loading: false,
};

export const createUserReminder = createAsyncThunk(
  "/addReminder",
  async (payload, { rejectWithValue }) => {
    try {
      return payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const editUserReminder = createAsyncThunk(
  "/editReminder",
  async (payload, { rejectWithValue }) => {
    try {
      return payload;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const reminderSlice = createSlice({
  name: "reminder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createUserReminder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createUserReminder.fulfilled, (state, action) => {
      state.loading = false;
      state.userReminders = [...state?.userReminders, action?.payload];
    });
    builder.addCase(createUserReminder.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(editUserReminder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editUserReminder.fulfilled, (state, action) => {
      state.loading = false;
      state.userReminders = [...state?.userReminders, action?.payload];
    });
    builder.addCase(editUserReminder.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default reminderSlice.reducer;
