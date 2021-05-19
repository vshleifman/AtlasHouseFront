import moment from 'moment';
import styled from 'styled-components';
import { useContext, useState } from 'react';
import { FilterContext } from './FilterProvider';
import DatePicker from 'react-datepicker';
import { Heading } from 'styles/styles';

const Container = styled.div`
  display: grid;
  grid-area: search;
  grid-template: 'head' 5em 'date' auto/ auto;
  place-items: center;
`;

const DateSearchBar = () => {
  const { filters, setFilters } = useContext(FilterContext);

  const [startDate, setStartDate] = useState(moment().hour(15).toDate());
  const [endDate, setEndDate] = useState(moment().add(1, 'd').hour(12).toDate());

  const onChange = ([start, end]: [Date, Date]) => {
    setStartDate(start);
    setEndDate(end);
  };

  const onClickOutside = () => {
    setFilters({
      ...filters,
      dateRange: {
        from: moment(startDate).hour(15).toISOString(),
        to: moment(endDate).hour(12).toISOString(),
      },
    });
  };

  return (
    <Container>
      <Heading>Enter the dates of your visit</Heading>
      <div tw="grid-area[date] my-4 text-3xl">
        <DatePicker
          onChange={onChange}
          onClickOutside={onClickOutside}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          monthsShown={2}
          inline
          fixedHeight={true}
        />
      </div>
    </Container>
  );
};

export default DateSearchBar;
