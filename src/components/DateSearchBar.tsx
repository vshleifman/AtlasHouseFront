import { Field, Form, Formik } from "formik";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setPropertiesThunk } from "./ApartmentList/PropertyThunks";
import styled from "styled-components";
import { Apartment } from "types/types";
import { useContext } from "react";
import { FilterContext } from "./ApartmentList/Apartments";
import { initialFiltersState } from "./ApartmentList/Apartments";

const Container = styled.div`
  display: grid;
  grid-area: search;
  grid-template: "head" 1fr "date" 1fr "resbtn" 1fr/ 1fr;
  border: 1px black solid;
`;

const Heading = styled.p`
  display: grid;
  grid-area: head;
`;

const DateInput = styled.div`
  display: grid;
  grid-area: date;
  place-items: center;
  grid-template: "lable1 lable2" 1fr / 1fr 1fr;
`;

const Lable1 = styled.div`
  grid-area: lable1;
`;
const Lable2 = styled.div`
  grid-area: lable2;
`;

const Button = styled.button`
  display: grid;
  justify-self: end;
  grid-area: btn;
`;

const StForm = styled(Form)`
  display: grid;
  grid-template: "date" 1fr "btn" 1fr;
`;

const ResetButton = styled.button`
  grid-area: resbtn;
  place-self: end;
`;

const today = moment();

const DateSearchBar = ({
  className,
  apartments,
}: {
  className?: any;
  apartments: Apartment[];
}) => {
  const dispatch = useDispatch();

  const { filters, setFilters } = useContext(FilterContext);

  return (
    <Container className={className}>
      <Heading>Enter the dates of your visit</Heading>
      <Formik
        initialValues={{
          from: today.format("yyyy-MM-DD"),
          to: moment(today).add(1, "day").format("yyyy-MM-DD"),
        }}
        onSubmit={({ from, to }, { setSubmitting }) => {
          setSubmitting(false);
          dispatch(setPropertiesThunk(filters));
        }}
      >
        <StForm>
          <DateInput>
            <Lable1>
              <label htmlFor="from">From:</label>
              <Field
                onBlur={(e: any) => {
                  setFilters({
                    ...filters,
                    dateRange: {
                      ...filters.dateRange,
                      from: moment(e.target.value).add(1, "h").toISOString(),
                    },
                  });
                }}
                id="from"
                name="from"
                type="date"
              />
            </Lable1>

            <Lable2>
              <label htmlFor="to">To:</label>
              <Field
                onBlur={(e: any) => {
                  setFilters({
                    ...filters,
                    dateRange: {
                      ...filters.dateRange,
                      to: moment(e.target.value).add(1, "h").toISOString(),
                    },
                  });
                }}
                id="to"
                name="to"
                type="date"
              />
            </Lable2>
          </DateInput>
          <Button type="submit">Search Apartments</Button>
        </StForm>
      </Formik>
      <ResetButton
        onClick={() => {
          dispatch(setPropertiesThunk());
          setFilters(initialFiltersState);
        }}
      >
        Reset Filters
      </ResetButton>
    </Container>
  );
};

export default DateSearchBar;
