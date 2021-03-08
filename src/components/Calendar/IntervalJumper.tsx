import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setToday } from "reducers/CalendarSlice";
import styled from "styled-components";
import { calendarSelector } from "../../selectors/selectors";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
`;

const JumpButton = ({
  interval,
  direction,
  text,
}: {
  interval: any;
  direction: string;
  text: string;
}) => {
  const { today } = useSelector(calendarSelector);
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => {
        direction === "-"
          ? dispatch(setToday(moment(today).subtract(1, interval)))
          : dispatch(setToday(moment(today).add(1, interval)));
      }}
    >
      {text}
    </button>
  );
};

const IntervalJumper = () => {
  return (
    <Container>
      <JumpButton interval="y" direction="-" text="previous year" />
      <JumpButton interval="M" direction="-" text="previous month" />
      <JumpButton interval="d" direction="-" text="previous day" />
      <JumpButton interval="d" direction="+" text="next day" />
      <JumpButton interval="M" direction="+" text="next month" />
      <JumpButton interval="y" direction="+" text="next year" />
    </Container>
  );
};

export default IntervalJumper;
