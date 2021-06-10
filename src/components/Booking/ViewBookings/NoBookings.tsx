import { Link } from 'react-router-dom';

const NoBookings = () => {
  return (
    <div tw="h-60 items-center justify-center flex flex-col">
      <p tw="text-5xl mb-3">No Bookings Found</p>
      <p>
        <Link to="/" tw="text-4xl">
          Check out the available apartments
        </Link>{' '}
      </p>
    </div>
  );
};

export default NoBookings;
