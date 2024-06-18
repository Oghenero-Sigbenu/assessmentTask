import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const KEY = "TVZPNAZERWC35RBXYZ528WU4A";
const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

const initialState = {
  neewUserReminder: {},
  userReminders: [],
  loading: false,
  city: {},
  ip: "",
  isCityLoading: false,
  weatherData: "",
  getWeatherError: {},
  isIpLoading: false,
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

export const getWeatherDetails = createAsyncThunk(
  "/getWeather",
  async (payload, { rejectWithValue }) => {
    const { city, date } = payload;
    const url = `${BASE_URL}/${city}/${date}?unitGroup=metric&key=${KEY}&contentType=json`;
    try {
      const data = await axios.get(url);
      if (data?.data?.days && data?.data?.days.length > 0) {
        return data?.data?.days[0]?.conditions;
      } else {
        throw new Error("No weather data found for the specified date.");
      }
    } catch (err) {
      if (err?.response?.data) {
        toast.error(err?.response?.data);
      }
      return rejectWithValue(err?.response?.data);
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
    builder.addCase(createUserReminder.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(editUserReminder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editUserReminder.fulfilled, (state, action) => {
      state.loading = false;
      state.userReminders = action?.payload;
    });
    builder.addCase(editUserReminder.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getWeatherDetails.pending, (state) => {
      state.isCityLoading = true;
      state.isIpLoading = true;
    });
    builder.addCase(getWeatherDetails.fulfilled, (state, action) => {
      state.isCityLoading = false;
      state.isIpLoading = false;
      state.weatherData = action.payload;
    });
    builder.addCase(getWeatherDetails.rejected, (state, action) => {
      state.isCityLoading = false;
      state.isIpLoading = false;
      state.getWeatherError = action.payload;
    });
  },
});

export default reminderSlice.reducer;
