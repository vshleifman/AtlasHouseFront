import api from "api/axiosInstance";
import { AppThunk } from "store/store";
import { setProperties } from "./PropertySlice";
import { addError } from "./PropertySlice";

export const setPropertiesThunk = (): AppThunk => async (dispatch) => {
  try {
    const response = await api.get(`/properties`);
    dispatch(setProperties(response.data));
  } catch (error) {
    dispatch(addError(error.message));
  }
};
