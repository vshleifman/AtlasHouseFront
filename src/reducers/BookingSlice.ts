import { createSlice } from "@reduxjs/toolkit";
import api from "api/axiosInstance";
import { AppThunk } from "store/store";

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

export const { setBookings, addError } = BookingSlice.actions;

export default BookingSlice.reducer;
