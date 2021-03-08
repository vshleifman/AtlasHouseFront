import styled from "styled-components";
import moment from "moment";
import IntervalJumper from "./IntervalJumper";
import { useDispatch, useSelector } from "react-redux";
import { calendarSelector } from "selectors/selectors";
import { useEffect } from "react";
import { setToday } from "reducers/CalendarSlice";
import DateSetter from "./DateSetter";
import IntervalSelector from "./IntervalSelector";

const rooms = [
  { code: "32b", in: 2, out: 3 },
  { code: "33a", in: 1, out: 5 },
  { code: "54a", in: 1, out: 2 },
  { code: "72b", in: 4, out: 5 },
  { code: "12a", in: 4, out: 6 },
];
const Calendar = () => {
  const { interval } = useSelector(calendarSelector);

  const Container = styled.div`
    display: grid;
    grid-template: "rnc mr" minmax(2em, 1fr) "rnc rr" minmax(2em, auto) / 1fr 18fr;
  `;

  //<----- Room Rows ----->
  const RoomsNamesCol = styled.div`
    display: grid;
    grid-area: rnc;
  `;
  const RoomRow = styled.div`
    grid-area: rr;
  `;
  const RoomName = styled.div`
    border: 1px solid black;
  `;

  const RoomDays = styled.div`
    height: 2em;
    display: grid;
    grid-template-columns: repeat(${interval}, minmax(2em, 1fr));
  `;
  const DayCell = styled.div`
    border: 1px solid black;
  `;

  //<----- Date Rows ----->
  const MonthRow = styled.div`
    display: grid;
    grid-area: mr;
  `;
  const MonthName = styled.div`
    border: 1px solid black;
  `;
  const DatesRow = styled.div`
    display: grid;
    grid-template-columns: repeat(${interval}, minmax(2em, 1fr));
  `;
  const DateCell = styled.div`
    text-align: center;
    border: 1px solid black;
    font-size: 0.7em;
  `;
  const WeekdayRow = styled(DatesRow)``;
  const WeekdayCell = styled(DateCell)``;

  //<----- Component ------>

  for (let i = moment().date(); i < 60; i++) {
    console.log(i);
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setToday(moment()));
  }, [dispatch]);

  const { today } = useSelector(calendarSelector);

  const todayMoment = moment(today);

  const currentDay = moment(todayMoment);

  const dayCells: JSX.Element[] = [];
  const monthCells: JSX.Element[] = [];
  const weekdayCells: JSX.Element[] = [];

  for (let i = currentDay.date(); i < interval + today.date(); i++) {
    dayCells.push(
      <DayCell
        style={
          currentDay.format("ddd") === "Sun" ? { backgroundColor: "gray" } : {}
        }
        key={i}
      ></DayCell>
    );
    monthCells.push(
      <DateCell key={`mC${i}`}>{currentDay.format("D")}</DateCell>
    );
    weekdayCells.push(
      <WeekdayCell key={`wC${i}`}>{currentDay.format("ddd")}</WeekdayCell>
    );
    currentDay.add(1, "d");
  }

  const roomsNames: JSX.Element[] = [];
  const stakcedRoomRows: JSX.Element[] = [];

  rooms.forEach((room) => {
    if (room.in <= todayMoment.month() && room.out >= todayMoment.month()) {
      roomsNames.push(<RoomName key={`rN${room.code}`}>{room.code}</RoomName>);

      stakcedRoomRows.push(
        <RoomDays key={`rD${room.code}`}>{dayCells}</RoomDays>
      );
    }
  });

  return (
    <div>
      <Container>
        <RoomsNamesCol>
          <MonthName>{todayMoment.format("MMMM")}</MonthName>
          {roomsNames}
        </RoomsNamesCol>
        <MonthRow>
          <DatesRow>{monthCells}</DatesRow>
          <WeekdayRow>{weekdayCells}</WeekdayRow>
        </MonthRow>
        <RoomRow>{stakcedRoomRows}</RoomRow>
      </Container>
      <IntervalSelector />
      <IntervalJumper />
      <DateSetter />
    </div>
  );
};

export default Calendar;
