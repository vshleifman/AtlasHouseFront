import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../reducers/AuthSlice";
import userReducer from "../reducers/UserSlice";
import bookingReducer from "../reducers/BookingSlice";
import calendarReducer from "../reducers/CalendarSlice";
import propertyReducer from "reducers/PropertySlice";

const rootReducer = combineReducers({
  authSlice: authReducer,
  userSlice: userReducer,
  bookingSlice: bookingReducer,
  calendarSlice: calendarReducer,
  propertySlice: propertyReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
