import moment from "moment";
import styled from "styled-components";
import { useContext, useState } from "react";
import { FilterContext } from "./FilterProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Container = styled.div`
  display: grid;
  grid-area: search;
  grid-template: "head" 5em "date" auto/ auto;
  place-items: center;
`;

const Heading = styled.h3`
  font-size: 2em;
  grid-area: head;
`;

const StDatePicker = styled.div`
  grid-area: date;
  margin: 2em 0;
`;

const DateSearchBar = () => {
  const { filters, setFilters } = useContext(FilterContext);

  const [startDate, setStartDate] = useState(moment().toDate());
  const [endDate, setEndDate] = useState(null);

  const onChange = (
    dates: Date | [Date, Date] | null,
    event: React.SyntheticEvent<any, Event> | undefined
  ) => {
    //@ts-ignore
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const onClickOutside = () => {
    setFilters({
      ...filters,
      dateRange: {
        from: moment(startDate).toISOString(),
        to: moment(endDate).toISOString(),
      },
    });
  };

  return (
    <Container>
      <Heading>Enter the dates of your visit</Heading>
      <StDatePicker>
        <DatePicker
          selected={startDate}
          onChange={onChange}
          onClickOutside={onClickOutside}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          monthsShown={2}
          inline
        />
      </StDatePicker>
    </Container>
  );
};

export default DateSearchBar;
