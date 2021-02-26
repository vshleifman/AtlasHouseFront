import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { signupThunk } from "../../reducers/AuthSlice";

const SignupForm = () => {
  const dispatch = useDispatch();

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
          signupThunk({
            user: { firstName, email, password, lastName },
            type: "User",
          })
        );
      }}
    >
      <Form>
        <label htmlFor="firstName">First Name</label>
        <Field name="firstName" type="text" />
        <ErrorMessage name="firstName" />
        <br />
        <label htmlFor="lastName">Last Name</label>
        <Field name="lastName" type="text" />
        <ErrorMessage name="lastName" />
        <br />
        <label htmlFor="email">Email</label>
        <Field name="email" type="email" />
        <ErrorMessage name="email" />
        <br />
        <label htmlFor="password">Password</label>
        <Field name="password" type="text" />
        <ErrorMessage name="password" />
        <br />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default SignupForm;
