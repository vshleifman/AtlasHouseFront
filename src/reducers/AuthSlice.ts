import { createSlice } from "@reduxjs/toolkit";
import api from "api/axiosInstance";
import { AppThunk } from "store/store";
import { initialUserData, setUser, setUserThunk } from "./UserSlice";
import { MemoryHistory } from "history";

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
      state.errorMsg = JSON.stringify(action.payload);
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

export const authThunk = (
  endpoint: string,
  userData: {
    user: {
      firstName?: string;
      lastName?: string;
      email: string;
      password: string;
    };
    type?: string;
  },
  history: MemoryHistory
): AppThunk => async (dispatch) => {
  try {
    let response;
    if (endpoint === "up") {
      response = await api.post("/signup", userData);
    } else {
      response = await api.post("/signin", {
        email: userData.user.email,
        password: userData.user.password,
      });
    }
    dispatch(signin(response.data.token));
    dispatch(setUser(response.data.user));
    localStorage.setItem("token", response.data.token);
    history.goBack();
  } catch (error) {
    dispatch(addError(error.response.data.msg));
  }
};

export const signoutThunk = (): AppThunk => async (dispatch) => {
  try {
    await api.post("/signout");
    localStorage.removeItem("token");
    dispatch(signout());
    dispatch(setUser(initialUserData));
    window.location.replace("/");
  } catch (error) {
    dispatch(addError(error.response.data.msg));
  }
};

export const { signin, signout, addError } = AuthSlice.actions;

export default AuthSlice.reducer;
