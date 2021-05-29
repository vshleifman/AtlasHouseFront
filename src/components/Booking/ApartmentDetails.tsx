import { useContext } from 'react';
import { BookingContext } from './BookingProvider';

const ApartmentDetails = () => {
  const { apartment } = useContext(BookingContext);

  return (
    <div tw="grid grid-template-columns[1fr 2fr] place-items-center">
      <label htmlFor="aprtm">Apartment Name</label>
      <h4>{apartment?.name}</h4>

      <label htmlFor="aprtm">Total Price</label>
      <h4>{`${apartment?.price}`}</h4>
    </div>
  );
};

export default ApartmentDetails;
