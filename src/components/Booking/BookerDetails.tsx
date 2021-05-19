import { FilterContext } from 'components/ApartmentList/FilterProvider';
import { Field, Form, Formik, FormikProps } from 'formik';
import moment from 'moment';
import { RefObject, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { postBookingThunk } from 'reducers/BookingSlice';
import { Apartment } from 'types/types';

const BookerDetails = ({
  formikRef,
  initialValues,
  apartment,
}: {
  formikRef: RefObject<FormikProps<typeof initialValues>>;
  initialValues: any;
  apartment?: Apartment;
}) => {
  const { filters } = useContext(FilterContext);
  const dispatch = useDispatch();
  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);

        dispatch(
          postBookingThunk({
            checkIn: values.checkIn,
            checkOut: values.checkOut,
            property: apartment?.id,
            amount: values.amount,
          }),
        );
      }}
    >
      <Form tw="grid grid-template-columns[1fr 2fr] place-items-center">
        <label htmlFor="firstName">Check In</label>
        <Field name="checkIn" type="text" value={moment(filters.dateRange.from).format('DD/MM/yyyy')} />

        <label htmlFor="firstName">Check Out</label>
        <Field name="checkOut" type="text" value={moment(filters.dateRange.to).format('DD/MM/yyyy')} />

        <label htmlFor="firstName">First Name</label>
        <Field name="firstName" type="text" />

        <label htmlFor="lastName">Last Name</label>
        <Field name="lastName" type="text" />

        <label htmlFor="amount">Amount of Guests</label>
        <Field name="amount" type="number" />
      </Form>
    </Formik>
  );
};

export default BookerDetails;
