import { createContext, useState } from 'react';

export const initialFiltersState: FilterState = {
  dateRange: { from: undefined, to: undefined },
  amenities: {
    balcony: false,
    bathtub: false,
    wifi: false,
  },
  sortBy: undefined,
};

export interface FilterState {
  dateRange: { from: string | undefined; to: string | undefined };
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

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
