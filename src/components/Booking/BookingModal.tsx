import { FilterContext } from 'components/ApartmentList/FilterProvider';
import { FormikProps } from 'formik';
import { useContext, useRef } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from 'selectors/selectors';
import { Btn, Heading } from 'styles/styles';
import { Apartment } from 'types/types';
import ApartmentDetails from './ApartmentDetails';
import BookerDetails from './BookerDetails';
import { BookingContext } from './BookingProvider';
import ModalCloseButton from './ModalCloseButton';
import Section from './Section';

const BookingModal = () => {
  const formikRef = useRef<FormikProps<typeof initialValues>>(null);
  const { filters } = useContext(FilterContext);
  const { apartment, setIsOpen } = useContext(BookingContext);
  const user = useSelector(userSelector).userData;

  const initialValues = {
    checkIn: filters.dateRange.from,
    checkOut: filters.dateRange.to,
    firstName: user?.firstName,
    lastName: user?.lastName,
    amount: 1,
  };

  return (
    <>
      <ModalCloseButton />
      <div tw="flex flex-col font-family['Playfair Display'] text-2xl">
        <Heading tw="text-4xl self-center">Check the Booking Details</Heading>
        <Section
          title="Your Details"
          content={<BookerDetails apartment={apartment} formikRef={formikRef} initialValues={initialValues} />}
        />

        <hr tw="text-secondary m-3" />

        <Section title="Apertment Details" content={<ApartmentDetails apartment={apartment} />} />
        <section tw="self-center mt-4">
          <Btn
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Return
          </Btn>
          <Btn type="submit" onClick={() => formikRef.current?.handleSubmit()}>
            Confirm Booking
          </Btn>
        </section>
      </div>
    </>
  );
};

export default BookingModal;
