import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { authThunk } from '../../reducers/AuthSlice';
import { useHistory } from 'react-router';
import { MemoryHistory } from 'history';
import { Btn, Heading } from 'styles/styles';
import styled from 'styled-components';
import tw from 'twin.macro';

const SigninForm = () => {
  const dispatch = useDispatch();
  const history = useHistory() as MemoryHistory;

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email adress').required('Required'),
        password: Yup.string().min(7).required('Required'),
      })}
      onSubmit={({ email, password }, { setSubmitting }) => {
        setSubmitting(false);
        dispatch(authThunk('in', { email, password }, history));
      }}
    >
      <Form>
        <div>
          <Heading>Sign into you account</Heading>

          <label htmlFor="email">
            <h4>Email</h4>
          </label>
          <Field id="email" name="email" type="email" />
          <ErrorMessage name="email" />

          <label htmlFor="password">
            <h4>Password</h4>
          </label>
          <Field id="password" name="password" type="text" />
          <ErrorMessage name="password" />

          <Btn type="submit">Sign in</Btn>
        </div>
      </Form>
    </Formik>
  );
};

export default SigninForm;
