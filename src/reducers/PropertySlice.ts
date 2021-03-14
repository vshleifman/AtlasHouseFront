import { createSlice } from "@reduxjs/toolkit";
import api from "api/axiosInstance";
import { AppThunk } from "store/store";
import { addError } from "./UserSlice";

const PropertySlice = createSlice({
  name: "property",
  initialState: {
    properties: [{ name: "", price: "", available: true }],
    errorMsg: "",
  },
  reducers: {
    setProperies(state, action) {
      state.properties = action.payload;
    },
    addError(state, action) {
      state.errorMsg = action.payload;
    },
  },
});

export const setPropertiesThunk = (): AppThunk => async (dispatch) => {
  try {
    const response = await api.get("/properties");
    // setTimeout(() => {
    // }, 1000);
    dispatch(setProperies(response.data));
  } catch (error) {
    dispatch(addError(error));
  }
};

export const { setProperies } = PropertySlice.actions;

export default PropertySlice.reducer;
