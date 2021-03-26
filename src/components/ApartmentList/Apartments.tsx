import ApartmentList from "components/ApartmentList/ApartmentList";
import Filter from "components/ApartmentList/Filter";
import DateSearchBar from "components/DateSearchBar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPropertiesThunk } from "./PropertyThunks";
import { propertySelector } from "selectors/selectors";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template: "filter search" 1fr "filter list" 10fr/ 1fr 10fr;
`;

const StApartmentList = styled(ApartmentList)`
  grid-area: list;
`;

const StSearchBar = styled(DateSearchBar)`
  grid-area: search;
`;

const StFilter = styled.div`
  grid-area: filter;
  border: 1px solid black;
`;

const Apartments = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPropertiesThunk());
  }, [dispatch]);

  const apartments = useSelector(propertySelector).properties;
  return (
    <Container>
      <StSearchBar apartments={apartments} />
      <StApartmentList apartments={apartments} />
      <StFilter />
    </Container>
  );
};

export default Apartments;
