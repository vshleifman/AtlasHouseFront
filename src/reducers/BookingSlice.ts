import { createSlice } from "@reduxjs/toolkit";
import api from "api/axiosInstance";
import { AppThunk } from "store/store";
import { addError } from "./UserSlice";

const BookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [],
    errorMsg: "",
  },
  reducers: {
    setBookings(state, action) {
      state.bookings = action.payload;
    },
    addError(state, action) {
      state.errorMsg = JSON.stringify(action.payload);
    },
  },
});

export const setBookingsThunk = (): AppThunk => async (dispatch) => {
  try {
    const response = await api.get("/bookings");
    dispatch(setBookings(response.data));
  } catch (error) {
    dispatch(addError(error));
  }
};

export const { setBookings } = BookingSlice.actions;

export default BookingSlice.reducer;
