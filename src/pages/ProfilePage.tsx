import { useDispatch, useSelector } from "react-redux";
import { signoutThunk } from "reducers/AuthSlice";
import { userSelector } from "selectors/selectors";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
`;

const ProfilePage = () => {
  const dispatch = useDispatch();
  const userData = useSelector(userSelector);
  return (
    <Container>
      <div>
        <p>First Name: {userData.userData.firstName}</p>
        <p>Last Name: {userData.userData.lastName}</p>
        <p>Email: {userData.userData.email}</p>
        <p>User Type: {userData.userData.__t}</p>
      </div>
      <button
        onClick={() => {
          dispatch(signoutThunk());
        }}
      >
        Signout
      </button>
    </Container>
  );
};

export default ProfilePage;
