import ApartmentList from "components/ApartmentList/ApartmentList";
import Filter from "components/ApartmentList/Filter";
import DateSearchBar from "components/DateSearchBar";
import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPropertiesThunk } from "./PropertyThunks";
import { propertySelector } from "selectors/selectors";
import styled from "styled-components";
import moment from "moment";

const Container = styled.div`
  display: grid;
  grid-template: "search search" 1fr "filter list" 2fr ". list" 1fr/ 1fr 8fr;
`;

const StApartmentList = styled(ApartmentList)`
  grid-area: list;
`;

const StSearchBar = styled(DateSearchBar)`
  grid-area: search;
`;

const StFilter = styled(Filter)`
  grid-area: filter;
  border: 1px solid black;
`;

const initialFiltersState = {
  dateRange: { from: "", to: "" },
  amenities: {
    balcony: false,
    bathtub: false,
  },
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

const Apartments = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPropertiesThunk());
  }, [dispatch]);

  const apartments = useSelector(propertySelector).properties;
  return (
    <FilterProvider>
      <Container>
        <StSearchBar apartments={apartments} />
        <StApartmentList apartments={apartments} />
        <StFilter apartments={apartments} />
      </Container>
    </FilterProvider>
  );
};

export default Apartments;
