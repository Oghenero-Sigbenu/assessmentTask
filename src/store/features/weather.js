import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_KEY = "3keoOta1EWdlLdwO26Dtwvjlg33REzGw";
const KEY = "TVZPNAZERWC35RBXYZ528WU4A";
const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

const initialState = {
  city: "",
  isCityLoading: false,
  isWeatherLoading: false,
  weatherData: {},
};

export const getCurrentCity = createAsyncThunk(
  "/getCity",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://api.ipify.org/?format=json");
      const { data } = response;
      const res = await axios.get(
        `http://dataservice.accuweather.com/locations/v1/cities/ipaddress?q=${data?.ip}&apikey=${API_KEY}`
      );

      return res?.data?.LocalizedName;
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
      rejectWithValue(err);
    }
  }
);
const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrentCity.pending, (state) => {
      state.isCityLoading = true;
    });
    builder.addCase(getCurrentCity.fulfilled, (state, action) => {
      state.isCityLoading = false;
      state.city = action.payload;
    });
    builder.addCase(getCurrentCity.rejected, (state, action) => {
      state.isCityLoading = false;
      state.error = action.error;
    });
    builder.addCase(getWeatherDetails.pending, (state) => {
      state.isWeatherLoading = true;
    });
    builder.addCase(getWeatherDetails.fulfilled, (state, action) => {
      state.isWeatherLoading = false;
      state.weatherData = action.payload;
    });
    builder.addCase(getWeatherDetails.rejected, (state, action) => {
      state.isWeatherLoading = false;
    });
  },
});

export default weatherSlice.reducer;
