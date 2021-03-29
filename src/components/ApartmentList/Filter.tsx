import styled from "styled-components";
import Select from "react-select";
import { Apartment } from "types/types";
import { useDispatch } from "react-redux";
import { addFilter, setProperties } from "./PropertySlice";
import { useContext } from "react";
import { FilterContext } from "./Apartments";
const Container = styled.div`
  align-items: start;

  display: grid;
`;

const Sorter = styled.div``;
const selectOptions = [
  { value: "price_Desc", label: "priceDesc" },
  { value: "price_Asc", label: "priceAsc" },
  { value: "area_Desc", label: "areaDesc" },
  { value: "area_Asc", label: "areaAsc" },
];

const sort = (apartments: Apartment[], sortType: string) => {
  let sortValue = sortType.split("_");
  if (apartments[0].name) {
    const sorted = apartments.sort((a, b) => a.price - b.price);
    return sorted;
  } else {
    console.log("buu");
  }
};

const Filter = ({
  className,
  apartments,
}: {
  className?: any;
  apartments: Apartment[];
}) => {
  const dispatch = useDispatch();

  //@ts-ignore
  const { filters, setFilters } = useContext(FilterContext);

  return (
    <Container className={className}>
      <button
        onClick={() => {
          //@ts-ignore
          setFilters({ ...filters, balcony: !filters.balcony });
        }}
      >
        setFilter
      </button>
      <Sorter>
        Sort By:
        <Select
          options={selectOptions}
          onChange={(e) => {
            // dispatch(setProperties());
          }}
        />
      </Sorter>
    </Container>
  );
};

export default Filter;
