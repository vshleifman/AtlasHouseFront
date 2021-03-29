import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  properties: [
    {
      name: String(),
      codeID: String(),
      createdAt: String(),
      updatedAt: String(),
      price: Number(),
      isCleaned: Boolean(),
      id: String(),
      pictures: Array(),
      bookings: [
        {
          checkIn: String(),
          checkOut: String(),
          createdAt: String(),
          updatedAt: String(),
          property: String(),
          user: String(),
          paidFor: Boolean(),
        },
      ],
    },
  ],
  errorMsg: String(),
  filters: {
    balcony: Boolean(),
  },
};

const PropertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    setProperties(state, action) {
      state.properties = action.payload;
    },
    addFilter(state, action) {
      console.log(action);
      //@ts-ignore

      state.filters[action.payload.amenity] = action.payload.isSelected;
    },
    resetFilters(state) {
      state.filters = initialState.filters;
    },
    addError(state, action) {
      state.errorMsg = JSON.stringify(action.payload);
    },
  },
});

export const {
  setProperties,
  addError,
  addFilter,
  resetFilters,
} = PropertySlice.actions;

export default PropertySlice.reducer;
