import { FilterContext } from 'components/ApartmentList/FilterProvider';
import { Field, Form, Formik, FormikProps } from 'formik';
import moment from 'moment';
import { RefObject, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postBookingThunk, setBookingsThunk } from 'reducers/BookingSlice';
import { bookingSelector, userSelector } from 'selectors/selectors';
import { Apartment } from 'types/types';
import binaryFinder from './binaryBookingFinder';
import { BookingContext } from './BookingProvider';

const BookerDetails = ({
  formikRef,
  apartment,
}: {
  formikRef: RefObject<FormikProps<typeof initialValues>>;
  apartment?: Apartment;
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBookingsThunk());
  }, [dispatch]);

  const { filters } = useContext(FilterContext);
  const { setIsOpen } = useContext(BookingContext);

  const user = useSelector(userSelector).userData;
  const bookings = useSelector(bookingSelector).bookings;

  const initialValues = {
    checkIn: filters.dateRange.from,
    checkOut: filters.dateRange.to,
    firstName: user?.firstName,
    lastName: user?.lastName,
    amount: 1,
  };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);

        const isAvailable = binaryFinder(bookings || [], {
          checkIn: filters.dateRange.from!,
          checkOut: filters.dateRange.to!,
        });

        if (isAvailable) {
          dispatch(
            postBookingThunk({
              checkIn: values.checkIn,
              checkOut: values.checkOut,
              property: apartment?.id,
              amount: values.amount,
            }),
          );

          dispatch(setBookingsThunk());
        } else {
          alert('Not currently available');
          setIsOpen(false);
        }
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
