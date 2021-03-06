import { useDispatch, useSelector } from 'react-redux';
import { signoutThunk } from 'reducers/AuthSlice';
import { userSelector } from 'selectors/selectors';
import styled from 'styled-components';
import { Btn } from 'styles/styles';

const Container = styled.div`
  display: grid;
`;

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector).userData;
  if (!user) {
    return <Container></Container>;
  } else {
    return (
      <Container>
        <div>
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>Email: {user.email}</p>
        </div>
        <Btn
          onClick={() => {
            dispatch(signoutThunk());
          }}
        >
          Signout
        </Btn>
      </Container>
    );
  }
};

export default ProfilePage;
