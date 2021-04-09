import styled from "styled-components";
import Select, { OptionsType } from "react-select";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import {
  FilterContext,
  initialFiltersState,
  FilterState,
} from "./FilterProvider";
import { Btn } from "styles/styles";
import { setPropertiesThunk } from "./PropertyThunks";

const Container = styled.div`
  display: grid;
  grid-area: filter;
  align-items: start;
  grid-template-columns: 1fr 1fr;
  margin: 1em;
  gap: 1em;
`;

const sortOptions = [
  { value: "price:desc", label: "Price: highest first" },
  { value: "price:asc", label: "Price: lowest first" },
  { value: "area:desc", label: "Area: highest first" },
  { value: "area:asc", label: "Area: lowest first" },
];

const Filter = ({
  reference,
}: {
  reference?: React.MutableRefObject<null>;
}) => {
  const { filters, setFilters } = useContext(FilterContext);

  const filterOptions = Object.keys(filters.amenities).map((amenity) => {
    return {
      value: amenity,
      label: `${amenity.charAt(0).toUpperCase()}${amenity.slice(1)}`,
    };
  });

  const dispatch = useDispatch();

  const onFilterSelect = (
    options: OptionsType<{ value: string; label: string }>
  ) => {
    type FilterKey = keyof FilterState["amenities"];
    const values = options.map((item) => item.value) as FilterKey[];

    const tempAmenities = { ...initialFiltersState.amenities };

    values.forEach((val) => {
      tempAmenities[val] = true;
    });

    setFilters({ ...filters, amenities: tempAmenities });
  };

  return (
    <Container ref={reference}>
      <div>
        Sort By:
        <Select
          options={sortOptions}
          onChange={(e) => {
            setFilters({ ...filters, sortBy: e!.value });
          }}
        />
      </div>

      <div>
        Filter:
        <Select
          isMulti
          className="basic-multi-select"
          classNamePrefix="select"
          options={filterOptions}
          onChange={onFilterSelect}
        />
      </div>

      <Btn
        onClick={() => {
          dispatch(setPropertiesThunk());
          setFilters(initialFiltersState);
        }}
      >
        Reset Filters
      </Btn>

      <Btn
        style={{ justifySelf: "end" }}
        onClick={() => {
          dispatch(setPropertiesThunk(filters));
          //@ts-ignore
          reference?.current.scrollIntoView();
        }}
      >
        Search Apartments
      </Btn>
    </Container>
  );
};

export default Filter;
