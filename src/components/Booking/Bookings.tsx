import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBookingsThunk } from 'reducers/BookingSlice';
import { bookingSelector } from 'selectors/selectors';
import { Apartment, Booking } from 'types/types';

const Bookings = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBookingsThunk());
  }, [dispatch]);

  const bookings = useSelector(bookingSelector).bookings;

  return (
    <div>
      {bookings?.map((booking: Booking) => (
        <div>
          <p>{booking.property}</p>
          <p>{booking.user}</p>
          <p>{booking.checkIn}</p>
          <p>{booking.checkOut}</p>
          <p>{booking.paidFor}</p>
        </div>
      ))}
    </div>
  );
};

export default Bookings;
