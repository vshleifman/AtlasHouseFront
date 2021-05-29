import moment from 'moment';
import { createContext, useState } from 'react';
import { checkTimes } from 'types/types';

export const initialFiltersState: FilterState = {
  dateRange: {
    from: moment().hour(checkTimes.checkIn).minute(0).second(0).toISOString(),
    to: moment().add(1, 'd').hour(checkTimes.checkOut).minute(0).second(0).toISOString(),
  },
  amenities: {
    balcony: false,
    bathtub: false,
    wifi: false,
  },
  sortBy: undefined,
};

export interface FilterState {
  dateRange: { from: string; to: string };
  amenities: {
    balcony: boolean | undefined;
    bathtub: boolean | undefined;
    wifi: boolean | undefined;
  };
  sortBy: string | undefined;
}

export const FilterContext = createContext<{
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}>({ filters: initialFiltersState, setFilters: () => {} });

const FilterProvider = ({ children }: { children: JSX.Element }) => {
  const [filters, setFilters] = useState(initialFiltersState);

  return <FilterContext.Provider value={{ filters, setFilters }}>{children}</FilterContext.Provider>;
};

export default FilterProvider;
