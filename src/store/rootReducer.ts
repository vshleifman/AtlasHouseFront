import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../reducers/AuthSlice";
import userReducer from "../reducers/UserSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
