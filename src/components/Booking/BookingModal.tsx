import { FormikProps } from 'formik';
import { useContext, useRef } from 'react';
import { Btn, Heading } from 'styles/styles';
import ApartmentDetails from './ApartmentDetails';
import BookerDetails from './BookerDetails';
import { BookingContext } from './BookingProvider';
import ModalCloseButton from './ModalCloseButton';
import Section from './Section';

const BookingModal = () => {
  const formikRef = useRef<FormikProps<any>>(null);
  const { apartment, setIsOpen } = useContext(BookingContext);

  return (
    <>
      <ModalCloseButton />
      <div tw="flex flex-col font-family['Playfair Display'] text-2xl">
        <Heading tw="text-4xl self-center">Check the Booking Details</Heading>
        <Section title="Your Details" content={<BookerDetails apartment={apartment} formikRef={formikRef} />} />

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
