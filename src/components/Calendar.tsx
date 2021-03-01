import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBookingsThunk } from "reducers/BookingSlice";
import { bookingSelector } from "selectors/selectors";

const Calendar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBookingsThunk());
  }, [dispatch]);

  const bookings = useSelector(bookingSelector).bookings;
  console.log(bookings);

  class calendarTable {
    year: number;
    month: number;
    rooms: { name: string }[];
    constructor(year: number, month: number) {
      this.year = year;
      this.month = month;
      this.rooms = [];
    }

    numOfDays() {
      if (this.month === 2 && this.year % 4 !== 0) {
        return 28;
      } else if (this.month === 2 && this.year % 4 === 0) {
        return 29;
      } else if (this.month % 2 !== 0) {
        return 31;
      } else {
        return 30;
      }
    }

    createTable() {
      let columns = [];
      for (let i = 1; i <= this.numOfDays(); i++) {
        columns.push(<div id="columns">{i}</div>);
      }
      return (
        <div>
          {this.rooms.map((room) => {
            return <div id="rows">{room}</div>;
          })}
          {columns}
        </div>
      );
    }
  }

  const test = new calendarTable(2020, 2);

  bookings.forEach((booking) => {
    //@ts-ignore
    test.rooms.push(booking.property.codeID);
  });

  console.log(test.rooms);

  return (
    <div></div>
    // <div id="container">
    //   <div id="calendar">{test.createTable()}</div>
    // </div>
  );
};
export default Calendar;
