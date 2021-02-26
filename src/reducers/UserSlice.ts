import { createSlice } from "@reduxjs/toolkit";
import api from "api/axiosInstance";
import { AppThunk } from "store/store";
import { User } from "types/types";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    userData: {},
    errorMsg: "",
  },
  reducers: {
    setUser(state, action) {
      state.userData = action.payload;
    },
    addError(state, action) {
      state.errorMsg = action.payload;
    },
  },
});

export const setUserThunk = (): AppThunk => async (dispatch) => {
  try {
    const response = await api.get("/users/me");
    console.log(response.data);
    dispatch(setUser(response.data));
  } catch (error) {
    dispatch(addError(error.response.data.msg));
  }
};

export const updateUserThunk = (data: Partial<User>): AppThunk => async (
  dispatch
) => {
  try {
    const response = await api.patch("/users/me", data);
    dispatch(setUser(response.data));
  } catch (error) {
    dispatch(addError(error.response.data.msg));
  }
};

export const { setUser, addError } = UserSlice.actions;

export default UserSlice.reducer;
