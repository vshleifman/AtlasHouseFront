import { createSlice } from '@reduxjs/toolkit';
import { InitialPropertyState } from 'types/types';

const initialState: InitialPropertyState = {
  properties: undefined,
  filters: undefined,
  errorMsg: undefined,
};

const PropertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setProperties(state, action) {
      state.properties = action.payload;
    },
    addError(state, action) {
      state.errorMsg = JSON.stringify(action.payload);
    },
  },
});

export const { setProperties, addError } = PropertySlice.actions;

export default PropertySlice.reducer;
