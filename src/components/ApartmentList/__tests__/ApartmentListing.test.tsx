import { generateApartment, render, screen } from 'testUtils';
import moment from 'moment';
import ApartmentListing from '../ApartmentListing';
import { Apartment } from 'types/types';
import * as bookingThunk from 'components/Booking/BookingThunks';
import api from 'api/axiosInstance';

const customRender = (apartment: Apartment) => render(<ApartmentListing apartment={apartment} />);
const apartment = generateApartment(moment().add(1, 'day').add(100, 'millisecond').toISOString());

// it('setBookingsThunk is called', () => {
//   jest.spyOn(api, 'get').mockImplementationOnce(async () => {
//     const data = apartment.bookings;
//     return { data };
//   });
//   const sliceSpy = jest.spyOn(bookingSlice, 'setBookingsThunk');
//   customRender(apartment);
//   expect(sliceSpy).toHaveBeenCalled();
// });

it('renders listing with props', () => {
  jest.spyOn(api, 'get').mockResolvedValueOnce({ data: apartment.bookings });

  const sliceSpy = jest.spyOn(bookingThunk, 'setBookingsThunk');

  customRender(apartment);

  expect(sliceSpy).toHaveBeenCalled();

  expect(screen.getByText(apartment.name)).toBeInTheDocument();
  expect(screen.getByText(apartment.price)).toBeInTheDocument();
  expect(screen.getByText(apartment.description)).toBeInTheDocument();
});
