import { createSlice } from '@reduxjs/toolkit';
import api from 'api/axiosInstance';
import { AppThunk } from 'store/store';
import { Booking, InitialBookingState, User } from 'types/types';

const initialBookingState: InitialBookingState = {
  bookings: undefined,
  errorMsg: undefined,
};

const BookingSlice = createSlice({
  name: 'booking',
  initialState: initialBookingState,
  reducers: {
    setBookings(state, action) {
      state.bookings = action.payload;
    },
    addError(state, action) {
      state.errorMsg = JSON.stringify(action.payload);
    },
  },
});

export const setBookingsThunk = (): AppThunk => async dispatch => {
  try {
    const response = await api.get('/bookings');
    dispatch(setBookings(response.data));
  } catch (error) {
    dispatch(addError(error));
  }
};

export const postBookingThunk =
  (bookingData: Partial<Booking>): AppThunk =>
  async dispatch => {
    try {
      await api.post('/bookings', bookingData);
      dispatch(setBookingsThunk());
    } catch (error) {
      dispatch(addError(error));
    }
  };

export const adminBookingThunk =
  (userData: Partial<User>, bookingData: Partial<Booking>): AppThunk =>
  async dispatch => {
    console.log({ bookingData, userData });
    try {
      await api.post('/createUserAndBook', { booking: bookingData, user: userData });
      dispatch(setBookingsThunk());
    } catch (error) {
      console.log(error);
      dispatch(addError(error));
    }
  };

export const { setBookings, addError } = BookingSlice.actions;

export default BookingSlice.reducer;
