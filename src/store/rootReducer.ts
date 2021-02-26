import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../reducers/AuthSlice";
import userReducer from "../reducers/UserSlice";

const rootReducer = combineReducers({
  authSlice: authReducer,
  userSlice: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
