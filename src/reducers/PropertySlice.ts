import { createSlice } from "@reduxjs/toolkit";
import api from "api/axiosInstance";
import { AppThunk } from "store/store";

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
      console.log(action.payload);

      state.errorMsg = JSON.stringify(action.payload);
    },
  },
});

export const setPropertiesThunk = (): AppThunk => async (dispatch) => {
  try {
    const response = await api.get("/properties");
    dispatch(setProperies(response.data));
  } catch (error) {
    dispatch(addError(error.message));
  }
};

export const { setProperies, addError } = PropertySlice.actions;

export default PropertySlice.reducer;
