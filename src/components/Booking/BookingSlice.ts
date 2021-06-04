import { createSlice } from '@reduxjs/toolkit';
import { InitialBookingState } from 'types/types';

const initialBookingState: InitialBookingState = {
  bookings: undefined,
  ownBookings: undefined,
  errorMsg: undefined,
};

const BookingSlice = createSlice({
  name: 'booking',
  initialState: initialBookingState,
  reducers: {
    setBookings(state, action) {
      state.bookings = action.payload;
    },
    setOwnBookings(state, action) {
      state.ownBookings = action.payload;
    },
    addError(state, action) {
      state.errorMsg = JSON.stringify(action.payload);
    },
  },
});

export const { setBookings, setOwnBookings, addError } = BookingSlice.actions;

export default BookingSlice.reducer;
