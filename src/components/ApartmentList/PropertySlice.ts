import { createSlice } from "@reduxjs/toolkit";

const PropertySlice = createSlice({
  name: "property",
  initialState: {
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
    errorMsg: "",
  },
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
