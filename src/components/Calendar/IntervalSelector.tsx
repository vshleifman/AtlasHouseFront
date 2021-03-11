import { useDispatch } from "react-redux";
import { setInterval } from "reducers/CalendarSlice";
const SelectorButton = ({ interval }: { interval: number }) => {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => {
        dispatch(setInterval(interval));
      }}
    >{`view ${interval} days`}</button>
  );
};

const IntervalSelector = () => {
  return (
    <div>
      <SelectorButton interval={7} />
      <SelectorButton interval={14} />
      <SelectorButton interval={31} />
    </div>
  );
};

export default IntervalSelector;
