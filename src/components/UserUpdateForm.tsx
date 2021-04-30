import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { updateUserThunk } from 'reducers/UserSlice';

const UserUpdateForm = () => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        telNum: '',
        country: '',
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        let valuesToUPD = {};
        Object.keys(values).forEach(value => {
          // @ts-ignore
          if (values[value]) {
            // @ts-ignore
            valuesToUPD[value] = values[value];
          }
        });
        dispatch(updateUserThunk(valuesToUPD));
      }}
    >
      <Form>
        <label htmlFor="firstName">firstName</label>
        <Field name="firstName" type="firstName" />
        <ErrorMessage name="firstName" />
        <br />
        <label htmlFor="lastName">lastName</label>
        <Field name="lastName" type="lastName" />
        <ErrorMessage name="lastName" />
        <br />
        <label htmlFor="email">Email</label>
        <Field name="email" type="email" />
        <ErrorMessage name="email" />
        <br />
        <label htmlFor="password">password</label>
        <Field name="password" type="password" />
        <ErrorMessage name="password" />
        <br />
        <label htmlFor="telNum">telNum</label>
        <Field name="telNum" type="telNum" />
        <ErrorMessage name="telNum" />
        <br />
        <label htmlFor="country">country</label>
        <Field name="country" type="country" />
        <ErrorMessage name="country" />
        <br />
        <button type="submit">submit</button>
      </Form>
    </Formik>
  );
};

export default UserUpdateForm;
