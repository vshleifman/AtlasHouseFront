import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { authThunk } from "../../reducers/AuthSlice";
import { useHistory } from "react-router";
import { MemoryHistory } from "history";

const SignupForm = () => {
  const dispatch = useDispatch();
  const history = useHistory() as MemoryHistory;
  return (
    <Formik
      initialValues={{ firstName: "", email: "", password: "", lastName: "" }}
      validationSchema={Yup.object({
        firstName: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email adress").required("Required"),
        password: Yup.string().min(7).required("Required"),
      })}
      onSubmit={(
        { firstName, email, password, lastName },
        { setSubmitting }
      ) => {
        setSubmitting(false);
        dispatch(
          authThunk(
            "up",
            {
              user: { firstName, email, password, lastName },
              type: "User",
            },
            history
          )
        );
      }}
    >
      <Form>
        <label htmlFor="firstName">First Name</label>
        <Field id="firstName" name="firstName" type="text" />
        <ErrorMessage name="firstName" />
        <br />
        <label htmlFor="lastName">Last Name</label>
        <Field id="lastName" name="lastName" type="text" />
        <ErrorMessage name="lastName" />
        <br />
        <label htmlFor="email">Email</label>
        <Field id="email" name="email" type="email" />
        <ErrorMessage name="email" />
        <br />
        <label htmlFor="password">Password</label>
        <Field id="password" name="password" type="text" />
        <ErrorMessage name="password" />
        <br />
        <button type="submit">Sign up</button>
      </Form>
    </Formik>
  );
};

export default SignupForm;
