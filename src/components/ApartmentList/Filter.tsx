import styled from "styled-components";
import Select from "react-select";
import { Apartment } from "types/types";
import { useContext } from "react";
import { FilterContext } from "./Apartments";
import { Form, Formik } from "formik";
import FilterRadios from "./FilterRadios";
const Container = styled.div`
  align-items: start;

  display: grid;
`;

const Sorter = styled.div``;
const sortOptions = [
  { value: "price:desc", label: "priceDesc" },
  { value: "price:asc", label: "priceAsc" },
  { value: "area:desc", label: "areaDesc" },
  { value: "area:asc", label: "areaAsc" },
];

const Filter = ({
  className,
}: {
  className?: any;
  apartments: Apartment[];
}) => {
  const { filters, setFilters } = useContext(FilterContext);

  return (
    <Container className={className}>
      <Sorter>
        Sort By:
        <Select
          options={sortOptions}
          onChange={(e) => {
            setFilters({ ...filters, sortBy: e!.value });
          }}
        />
      </Sorter>
      <div>
        Filter:
        <Formik
          initialValues={{ balcony: filters.amenities.balcony }}
          onSubmit={(values, { setSubmitting }) => {}}
        >
          <Form>
            {Object.keys(filters.amenities).map((amenity) => {
              return <FilterRadios key={amenity} amenity={amenity} />;
            })}
          </Form>
        </Formik>
      </div>
    </Container>
  );
};

export default Filter;
