import api from 'api/axiosInstance';
import { AppThunk } from 'store/store';
import { Booking, User } from 'types/types';
import { addError, setBookings, setOwnBookings } from './BookingSlice';

export const setBookingsThunk = (): AppThunk => async dispatch => {
  try {
    const response = await api.get('/bookings');
    dispatch(setBookings(response.data));
  } catch (error) {
    dispatch(addError(error));
  }
};

export const setOwnBookingsThunk = (): AppThunk => async dispatch => {
  try {
    const response = await api.get('user_bookings');
    dispatch(setOwnBookings(response.data));
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
    try {
      await api.post('/createUserAndBook', { booking: bookingData, user: userData });
      dispatch(setBookingsThunk());
    } catch (error) {
      console.error(error);
      dispatch(addError(error));
    }
  };
