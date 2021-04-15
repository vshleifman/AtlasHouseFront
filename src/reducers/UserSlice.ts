import { createSlice } from "@reduxjs/toolkit";
import api from "api/axiosInstance";
import { AppThunk } from "store/store";
import { InitialUserState } from "types/types";

export const initialUserState: Partial<InitialUserState> = {
  userData: undefined,
  errorMsg: undefined,
};

const UserSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUser(state, action) {
      state.userData = action.payload;
    },
    addError(state, action) {
      state.errorMsg = JSON.stringify(action.payload);
    },
  },
});

export const setUserThunk = (): AppThunk => async (dispatch) => {
  try {
    const response = await api.get("/users/me");

    dispatch(setUser(response.data));
  } catch (error) {
    dispatch(addError(error.response.data.msg));
  }
};

export const updateUserThunk = (
  data: Partial<InitialUserState>
): AppThunk => async (dispatch) => {
  try {
    const response = await api.patch("/users/me", data);
    dispatch(setUser(response.data));
  } catch (error) {
    dispatch(addError(error.response.data.msg));
  }
};

export const { setUser, addError } = UserSlice.actions;

export default UserSlice.reducer;
