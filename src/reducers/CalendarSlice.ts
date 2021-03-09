import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const CalendarSlice = createSlice({
  name: "calendar",
  initialState: {
    today: moment().unix(),
    interval: 31,
  },
  reducers: {
    setToday(state, action) {
      state.today = action.payload;
    },
    setInterval(state, action) {
      state.interval = action.payload;
    },
  },
});

export const { setToday, setInterval } = CalendarSlice.actions;

export default CalendarSlice.reducer;
