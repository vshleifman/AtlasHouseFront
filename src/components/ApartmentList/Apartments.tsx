import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userSelector } from 'selectors/selectors';
import { Btn } from 'styles/styles';
import ApartmentList from './ApartmentList';
import DateSearchBar from './DateFilter';

const Apartments = () => {
  const user = useSelector(userSelector).userData;
  const isAdmin = user?.role === 2;

  return (
    <div tw="flex flex-col">
      <DateSearchBar />
      {isAdmin ? (
        <Btn tw="flex w-3 h-3 rounded-full items-center margin[-2rem 1rem] self-end">
          <Link tw="flex flex-col text-5xl flex-basis[100%] min-h-full justify-center" to="/add_apartment">
            +
          </Link>
        </Btn>
      ) : null}
      <ApartmentList />
    </div>
  );
};

export default Apartments;
