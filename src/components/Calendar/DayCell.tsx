import { useSelector } from "react-redux";
import { calendarSelector } from "selectors/selectors";
import moment from "moment";
import styled from "styled-components";

const StDayCell = styled.div`
  min-height: 10px;
  border: 1px solid black;
`;

const DayCell = ({
  currentRoom,
  currentDay,
}: {
  currentRoom: { code: string; in: moment.Moment; out: moment.Moment };
  currentDay: moment.Moment;
}) => {
  const { interval, today } = useSelector(calendarSelector);
  const todayMoment = moment(today);
  let dayCells = [];

  for (let i = currentDay.date(); i < interval + todayMoment.date(); i++) {
    dayCells.push(
      <StDayCell
        style={
          currentDay.format("ddd") === "Sun" ? { backgroundColor: "gray" } : {}
        }
        key={i}
      >
        {currentRoom.in.date() === currentDay.date() ||
        currentRoom.out.date() === currentDay.date()
          ? currentRoom.code
          : null}
      </StDayCell>
    );
    currentDay.add(1, "d");
  }

  return <div>{dayCells}</div>;
};

export default DayCell;
