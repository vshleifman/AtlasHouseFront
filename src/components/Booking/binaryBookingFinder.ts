import { Booking } from 'types/types';

const binaryFinder = (bookings: Booking[], newBookingDates: { checkIn: string; checkOut: string }): boolean => {
  if (!bookings.length) {
    console.log('no match');
    return true;
  }

  if (bookings.length === 1) {
    return bookings[0].checkOut < newBookingDates.checkIn || bookings[0].checkIn > newBookingDates.checkOut;
  }

  const midPoint = Math.floor(bookings.length / 2);

  let newArr = [];

  if (bookings[midPoint].checkIn === newBookingDates.checkIn) {
    return false;
  }

  if (bookings[midPoint].checkIn < newBookingDates.checkIn) {
    newArr = bookings.slice(midPoint + 1);
  } else {
    newArr = bookings.slice(0, midPoint);
  }
  return binaryFinder(newArr, newBookingDates);
};

export default binaryFinder;
