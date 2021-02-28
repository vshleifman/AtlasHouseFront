import { createSlice } from "@reduxjs/toolkit";
import api from "api/axiosInstance";
import { AppThunk } from "store/store";
import { setUser, setUserThunk } from "./UserSlice";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    errorMsg: "",
  },
  reducers: {
    signin(state, action) {
      state.errorMsg = "";
      const token: string = action.payload;
      state.token = token;
    },
    signout(state) {
      state.errorMsg = "";
      state.token = "";
    },
    addError(state, action) {
      state.errorMsg = action.payload;
    },
  },
});

export const tryAutoSignin = (): AppThunk => (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    dispatch(signin(token));
    dispatch(setUserThunk());
  } //add else
};

export const signupThunk = (userData: {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
  type: string;
}): AppThunk => async (dispatch) => {
  try {
    const response = await api.post("/signup", userData);
    dispatch(signin(response.data.token));
    dispatch(setUser(response.data.user));
    localStorage.setItem("token", response.data.token);
    window.history.back();
  } catch (error) {
    dispatch(addError(error.response.data.msg));
  }
};

export const signinThunk = (
  email: string,
  password: string
): AppThunk => async (dispatch) => {
  try {
    const response = await api.post("/signin", { email, password });
    dispatch(signin(response.data.token));
    dispatch(setUser(response.data.user));
    localStorage.setItem("token", response.data.token);
    window.history.back();
  } catch (error) {
    dispatch(addError(error.response.data.msg));
  }
};

export const signoutThunk = (): AppThunk => async (dispatch) => {
  try {
    await api.post("/signout");
    localStorage.removeItem("token");
    dispatch(signout());
    window.location.replace("/");
  } catch (error) {
    dispatch(addError(error.response.data.msg));
  }
};

export const { signin, signout, addError } = AuthSlice.actions;

export default AuthSlice.reducer;
