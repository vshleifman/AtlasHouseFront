import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';

export const authSelector = (state: RootState) => state.authSlice;
export const userSelector = (state: RootState) => state.userSlice;
export const bookingSelector = (state: RootState) => state.bookingSlice;
export const propertySelector = (state: RootState) => state.propertySlice;
