import { createSlice } from "@reduxjs/toolkit";
import api from "api/axiosInstance";
import { AppThunk } from "store/store";
import { initialUserState, setUser, setUserThunk } from "./UserSlice";
import { MemoryHistory } from "history";
import { InitialAuthState, User } from "types/types";

const initialAuthState: InitialAuthState = {
  token: undefined,
  errorMsg: undefined,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    signin(state, action) {
      state.errorMsg = undefined;
      const token: string = action.payload;
      state.token = token;
    },
    signout(state) {
      state.errorMsg = undefined;
      state.token = undefined;
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
  } else {
    dispatch(setUser({ role: 0 }));
  }
};

export const authThunk = (
  endpoint: string,
  userData: Partial<User>,
  history: MemoryHistory
): AppThunk => async (dispatch) => {
  try {
    let response;
    if (endpoint === "up") {
      response = await api.post("/signup", { user: userData });
    } else {
      response = await api.post("/signin", {
        email: userData.email,
        password: userData.password,
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
    dispatch(setUser(initialUserState));
    window.location.replace("/");
  } catch (error) {
    dispatch(addError(error.response.data.msg));
  }
};

export const { signin, signout, addError } = AuthSlice.actions;

export default AuthSlice.reducer;
