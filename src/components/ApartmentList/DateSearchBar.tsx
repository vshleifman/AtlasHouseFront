import moment from 'moment';
import { useContext, useRef, useState } from 'react';
import { FilterContext } from './FilterProvider';
import DatePicker from 'react-datepicker';
import Filter from './Filter';
import { checkTimes } from 'types/types';
import { useDispatch } from 'react-redux';
import { setPropertiesThunk } from './PropertyThunks';

const DateSearchBar = () => {
  const dispatch = useDispatch();

  const { filters, setFilters } = useContext(FilterContext);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const onChange = async ([start, end]: [Date, Date]) => {
    setStartDate(start);
    setEndDate(end);

    if (!end) return;

    const newFilters = {
      ...filters,
      dateRange: {
        from: moment(start).hour(checkTimes.checkIn).minute(0).second(0).toISOString(),
        to: moment(end).hour(checkTimes.checkOut).minute(0).second(0).toISOString(),
      },
    };

    setFilters(newFilters);

    dispatch(setPropertiesThunk(newFilters));
  };

  const reference = useRef<HTMLDivElement>(null);

  return (
    <div tw="flex gap-1 justify-center">
      <div tw="my-4 text-3xl">
        <DatePicker
          onChange={onChange}
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
