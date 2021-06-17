import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBookingsThunk, setOwnBookingsThunk } from 'components/Booking/BookingThunks';
import { bookingSelector, userSelector } from 'selectors/selectors';
import { Apartment, Booking, User } from 'types/types';
import moment from 'moment';
import NoBookings from './NoBookings';
import { Btn } from 'styles/styles';
import ReactModal from 'react-modal';
import InvoiceModal from './InvoiceModal';

const Bookings = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector).userData;

  const isAdmin = user?.role === 2;

  useEffect(() => {
    isAdmin ? dispatch(setBookingsThunk()) : dispatch(setOwnBookingsThunk());
  }, [dispatch, isAdmin]);

  const [isOpen, setIsOpen] = useState(false);

  const bookingKind = isAdmin ? 'bookings' : 'ownBookings';

  const bookings = useSelector(bookingSelector)[bookingKind];

  if (bookings?.length === 0) {
    return <NoBookings />;
  }

  return (
    <div>
      {bookings?.map((booking: Booking) => (
        <div tw="w-60 p-1 m-1 border border-dark-gray flex justify-around items-stretch" key={booking.createdAt}>
          <div>
            <p>
              Apartment: {(booking.property as Apartment).name} ({(booking.property as Apartment).codeID})
            </p>
            <p>First Name: {(booking.user as User).firstName}</p>
            <p>Last Name: {(booking.user as User).lastName}</p>
            <p>Check In: {moment(booking.checkIn).format('DD/MM/YYYY')}</p>
            <p>Check Out: {moment(booking.checkOut).format('DD/MM/YYYY')}</p>
            <p>Paid For: {booking.paidFor.toString()}</p>
          </div>
          <div>
            <Btn
              onClick={() => {
                setIsOpen(true);
              }}
            >
              Create Invoice
            </Btn>
            <ReactModal isOpen={isOpen} ariaHideApp={false}>
              <InvoiceModal booking={booking} setIsOpen={setIsOpen} />
            </ReactModal>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Bookings;
