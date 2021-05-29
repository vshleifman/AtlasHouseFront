import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { authThunk } from '../../reducers/AuthSlice';
import { useHistory } from 'react-router';
import { MemoryHistory } from 'history';
import { Btn, Heading } from 'styles/styles';

const SignupForm = () => {
  const dispatch = useDispatch();
  const history = useHistory() as MemoryHistory;
  return (
    <Formik
      initialValues={{
        firstName: '',
        email: '',
        password: '',
        lastName: '',
      }}
      validationSchema={Yup.object({
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email adress').required('Required'),
        password: Yup.string().min(7).required('Required'),
      })}
      onSubmit={({ firstName, email, password, lastName }, { setSubmitting }) => {
        setSubmitting(false);
        dispatch(authThunk('up', { firstName, email, password, lastName }, history));
      }}
    >
      <Form>
        <div>
          <Heading>Create a new account</Heading>

          <label htmlFor="firstName">
            <h4>First Name</h4>
          </label>
          <Field id="firstName" name="firstName" type="text" />
          <ErrorMessage name="firstName" />

          <label htmlFor="lastName">
            <h4>Last Name</h4>
          </label>
          <Field id="lastName" name="lastName" type="text" />
          <ErrorMessage name="lastName" />

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

          <Btn type="submit">Sign up</Btn>
        </div>
      </Form>
    </Formik>
  );
};

export default SignupForm;
