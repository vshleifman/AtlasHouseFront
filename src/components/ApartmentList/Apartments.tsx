import ApartmentList from "./ApartmentList";
import Filter from "./Filter";
import DateSearchBar from "./DateSearchBar";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPropertiesThunk } from "./PropertyThunks";
import { propertySelector } from "selectors/selectors";
import styled from "styled-components";
import FilterProvider from "./FilterProvider";

const Container = styled.div`
  display: grid;
  grid-template: "search" auto "filter" auto "list" 1fr / auto;
`;

const Apartments = () => {
  const dispatch = useDispatch();

  const reference = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(setPropertiesThunk());
  }, [dispatch]);

  const apartments = useSelector(propertySelector).properties;
  return (
    <FilterProvider>
      <Container>
        <DateSearchBar />
        <ApartmentList reference={reference} apartments={apartments} />
        <Filter reference={reference} />
      </Container>
    </FilterProvider>
  );
};

export default Apartments;
