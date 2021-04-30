import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { tryAutoSignin } from 'reducers/AuthSlice';
import styled from 'styled-components';
import { Btn } from 'styles/styles';
import SigninFrom from './SigninForm';
import SignupFrom from './SignupForm';

const Container = styled.div`
  display: grid;
  place-items: center;
  place-self: center;
  border: 2px double orange;
  width: 35em;
`;

const AuthForm = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tryAutoSignin());
  }, [dispatch]);

  const [isSingin, setIsSingin] = useState(true);

  return (
    <Container>
      {isSingin === true ? <SigninFrom /> : <SignupFrom />}

      <Btn onClick={() => setIsSingin(!isSingin)}>
        {`Sign ${isSingin ? 'up' : 'in'} instead`}
      </Btn>
    </Container>
  );
};

export default AuthForm;
