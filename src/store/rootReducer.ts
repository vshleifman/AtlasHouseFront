import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../reducers/AuthSlice";
import userReducer from "../reducers/UserSlice";
import bookingReducer from "../reducers/BookingSlice";
import calendarReducer from "../reducers/CalendarSlice";

const rootReducer = combineReducers({
  authSlice: authReducer,
  userSlice: userReducer,
  bookingSlice: bookingReducer,
  calendarSlice: calendarReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
