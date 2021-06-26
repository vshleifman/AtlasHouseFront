import Bookings from 'components/Booking/ViewBookings/Bookings';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { signoutThunk } from 'reducers/AuthSlice';
import { userSelector } from 'selectors/selectors';
// import styled from 'styled-components';
import { Btn } from 'styles/styles';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector).userData;
  if (!user) {
    return <div></div>;
  } else {
    return (
      <div tw="flex flex-col">
        <div tw="flex flex-col m-1 gap-1">
          <h3 tw="text-4xl ml-2 p-1">Your Profile</h3>
          <hr />
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>Email: {user.email}</p>
        </div>
        {user.role === 1 ? (
          <div>
            <h3 tw="text-4xl ml-2 p-2">Your Bookings</h3>
            <hr />
            <Bookings />
          </div>
        ) : (
          <div>
            <h3 tw="text-4xl ml-2 p-2">Bookings Today</h3>
            <hr />
            <Bookings interval={{ firstCheckIn: moment().toISOString(), lastCheckIn: moment().toISOString() }} />
          </div>
        )}
        <hr />

        <Btn
          tw="place-self-center"
          onClick={() => {
            dispatch(signoutThunk());
          }}
        >
          Signout
        </Btn>
      </div>
    );
  }
};

export default ProfilePage;
