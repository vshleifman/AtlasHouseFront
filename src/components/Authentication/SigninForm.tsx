import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { authThunk } from "../../reducers/AuthSlice";
import { useHistory } from "react-router";
import { MemoryHistory } from "history";

const SigninForm = () => {
  const dispatch = useDispatch();
  const history = useHistory() as MemoryHistory;

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email adress").required("Required"),
        password: Yup.string().min(7).required("Required"),
      })}
      onSubmit={({ email, password }, { setSubmitting }) => {
        setSubmitting(false);
        dispatch(authThunk("in", { user: { email, password } }, history));
      }}
    >
      <Form>
        <label htmlFor="email">Email</label>
        <Field id="email" name="email" type="email" />
        <ErrorMessage name="email" />
        <br />
        <label htmlFor="password">Password</label>
        <Field id="password" name="password" type="text" />
        <ErrorMessage name="password" />
        <br />
        <button type="submit">Sign in</button>
      </Form>
    </Formik>
  );
};

export default SigninForm;
