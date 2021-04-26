import moment from "moment";
import styled from "styled-components";
import { useContext, useState } from "react";
import { FilterContext } from "./FilterProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Heading } from "styles/styles";

const Container = styled.div`
  display: grid;
  grid-area: search;
  grid-template: "head" 5em "date" auto/ auto;
  place-items: center;
`;

const StDatePicker = styled.div`
  grid-area: date;
  margin: 2em 0;
`;

const DateSearchBar = () => {
  const { filters, setFilters } = useContext(FilterContext);

  const [startDate, setStartDate] = useState(moment().toDate());
  const [endDate, setEndDate] = useState(moment().add(1, "d").toDate());

  const onChange = ([start, end]: [Date, Date]) => {
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