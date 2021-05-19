import { Apartment } from 'types/types';

const ApartmentDetails = ({ apartment }: { apartment?: Apartment }) => {
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
