import { FilterContext } from 'components/ApartmentList/FilterProvider';
import { Field, Form, Formik, FormikProps } from 'formik';
import moment from 'moment';
import { RefObject, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminBookingThunk, postBookingThunk, setBookingsThunk } from 'components/Booking/BookingThunks';
import { bookingSelector, userSelector } from 'selectors/selectors';
import binaryFinder from './binaryBookingFinder';
import { BookingContext } from './BookingProvider';

const BookerDetails = ({ formikRef }: { formikRef: RefObject<FormikProps<typeof initialValues>> }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBookingsThunk());
  }, [dispatch]);

  const { filters } = useContext(FilterContext);
  const { setIsOpen, apartment } = useContext(BookingContext);
  const bookings = useSelector(bookingSelector);
  const user = useSelector(userSelector).userData;

  const initialValues = {
    checkIn: filters.dateRange.from || moment().hour(15).minute(0).second(0).toISOString(),
    checkOut: filters.dateRange.to || moment().add(1, 'd').hour(12).minute(0).second(0).toISOString(),
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: '',
    amount: 1,
  };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);

        const isAvailable = binaryFinder(apartment.bookings, {
          checkIn: filters.dateRange.from!,
          checkOut: filters.dateRange.to!,
        });

        if (isAvailable) {
          if (user?.role === 1) {
            dispatch(
              postBookingThunk({
                checkIn: values.checkIn,
                checkOut: values.checkOut,
                property: apartment?.id,
                amount: values.amount,
              }),
            );
          } else if (user?.role === 2) {
            dispatch(
              adminBookingThunk(
                { firstName: values.firstName!, lastName: values.lastName!, email: values.email! },
                { checkIn: values.checkIn, checkOut: values.checkOut, property: apartment?.id, amount: values.amount },
              ),
            );
          }
          alert('Booked!');
        } else {
          alert('Not currently available');
        }
        setIsOpen(false);
      }}
    >
      <Form tw="grid grid-template-columns[1fr 2fr] place-items-center">
        <label htmlFor="firstName">Check In</label>
        <Field name="checkIn" type="text" value={moment(initialValues.checkIn).format('DD/MM/yyyy')} />

        <label htmlFor="firstName">Check Out</label>
        <Field name="checkOut" type="text" value={moment(initialValues.checkOut).format('DD/MM/yyyy')} />

        <label htmlFor="firstName">First Name</label>
        <Field name="firstName" type="text" />

        <label htmlFor="lastName">Last Name</label>
        <Field name="lastName" type="text" />

        {user?.role === 2 ? (
          <>
            <label htmlFor="email">Email</label>
            <Field name="email" type="email" />
          </>
        ) : null}

        <label htmlFor="amount">Amount of Guests</label>
        <Field name="amount" type="number" />
      </Form>
    </Formik>
  );
};

export default BookerDetails;
