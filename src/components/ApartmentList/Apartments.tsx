import ApartmentList from './ApartmentList';
import DateSearchBar from './DateSearchBar';

const Apartments = () => {
  return (
    <div tw="flex flex-col">
      <DateSearchBar />
      <ApartmentList />
    </div>
  );
};

export default Apartments;
