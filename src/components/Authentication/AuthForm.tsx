import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { tryAutoSignin } from 'reducers/AuthSlice';
import styled from 'styled-components';
import { Btn } from 'styles/styles';
import tw from 'twin.macro';
import SigninFrom from './SigninForm';
import SignupFrom from './SignupForm';

const Container = styled.div`
  ${tw`flex flex-col items-center border-2 border-secondary border-double p-2`}
  input {
    ${tw`custom-input mt-0.5`}
  }
  label {
    ${tw`mt-2`}
  }
  div {
    ${tw`flex flex-col items-center`}
  }
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

      <Btn onClick={() => setIsSingin(!isSingin)}>{`Sign ${isSingin ? 'up' : 'in'} instead`}</Btn>
    </Container>
  );
};

export default AuthForm;
