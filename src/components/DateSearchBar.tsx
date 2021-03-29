import { Field, Form, Formik } from "formik";
import moment from "moment";
import { useDispatch } from "react-redux";
import { resetFilters, setProperties } from "./ApartmentList/PropertySlice";
import { setPropertiesThunk } from "./ApartmentList/PropertyThunks";
import styled from "styled-components";
import { Apartment } from "types/types";
import { useContext } from "react";
import { FilterContext } from "./ApartmentList/Apartments";

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
  //@ts-ignore
  const {
    filters,
    setFilters,
  }: {
    filters: Record<string, boolean | Record<string, string>>;
    setFilters: ({}) => {};
  } = useContext(FilterContext);

  return (
    <Container className={className}>
      <Heading>Enter the dates of your visit</Heading>
      <Formik
        initialValues={{
          from: today.format("yyyy-MM-DD"),
          to: moment(today).add(1, "week").format("yyyy-MM-DD"),
        }}
        onSubmit={({ from, to }, { setSubmitting }) => {
          setSubmitting(false);
          setFilters({
            ...filters,
            dateRange: {
              from: moment(from).add(1, "h").toISOString(),
              to: moment(to).add(1, "h").toISOString(),
            },
          });
          dispatch(setPropertiesThunk(filters));

          // const newData = apartments.filter((apart) =>
          //   apart.bookings.every(
          //     (booking) =>
          //       moment(booking.checkIn).toDate() > moment(to).toDate() ||
          //       moment(booking.checkOut).toDate() < moment(from).toDate()
          //   )
          // );
          // dispatch(setProperties(newData));
        }}
      >
        <StForm>
          <DateInput>
            <Lable1>
              <label htmlFor="from">From:</label>
              <Field id="from" name="from" type="date" />
            </Lable1>
            <Lable2>
              <label htmlFor="to">To:</label>
              <Field id="to" name="to" type="date" />
            </Lable2>
          </DateInput>
          <Button type="submit">Search Apartments</Button>
        </StForm>
      </Formik>
      <ResetButton
        onClick={() => {
          dispatch(resetFilters());
          dispatch(setPropertiesThunk());
        }}
      >
        Reset Filters
      </ResetButton>
    </Container>
  );
};

export default DateSearchBar;
