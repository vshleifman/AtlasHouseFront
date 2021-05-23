import moment from 'moment';
import { useContext, useRef, useState } from 'react';
import { FilterContext } from './FilterProvider';
import DatePicker from 'react-datepicker';
import Filter from './Filter';

const DateSearchBar = () => {
  const { filters, setFilters } = useContext(FilterContext);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const onChange = ([start, end]: [Date, Date]) => {
    // @ts-ignore
    setStartDate(start);
    // @ts-ignore

    setEndDate(end);
  };

  const onClickOutside = () => {
    setFilters({
      ...filters,
      dateRange: {
        from: moment(startDate).hour(15).minute(0).second(0).toISOString(),
        to: moment(endDate).hour(12).minute(0).second(0).toISOString(),
      },
    });
  };

  const reference = useRef<HTMLDivElement>(null);

  return (
    <div tw="flex gap-1">
      <div tw="my-4 text-3xl">
        <DatePicker
          onChange={onChange}
          onClickOutside={onClickOutside}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          monthsShown={2}
          inline
          fixedHeight={true}
          selected={startDate}
          disabledKeyboardNavigation
        />
      </div>
      <Filter reference={reference} />
    </div>
  );
};

export default DateSearchBar;
