import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { signinThunk } from "../../reducers/AuthSlice";

const SigninForm = () => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email adress").required("Required"),
        password: Yup.string().min(7).required("Required"),
      })}
      onSubmit={({ email, password }, { setSubmitting }) => {
        setSubmitting(false);
        dispatch(signinThunk(email, password));
      }}
    >
      <Form>
        <label htmlFor="email">Email</label>
        <Field name="email" type="email" />
        <ErrorMessage name="email" />
        <br />
        <label htmlFor="password">Password</label>
        <Field name="password" type="text" />
        <ErrorMessage name="password" />
        <br />
        <button type="submit">Sign in</button>
      </Form>
    </Formik>
  );
};

export default SigninForm;
