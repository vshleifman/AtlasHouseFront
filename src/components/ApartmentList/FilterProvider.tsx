import { createContext, useState } from "react";

export const initialFiltersState = {
  dateRange: { from: "", to: "" },
  amenities: {
    balcony: false,
    bathtub: false,
    wifi: false,
  },
  sortBy: "",
};

export type FilterState = typeof initialFiltersState;

export const FilterContext = createContext<{
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
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
