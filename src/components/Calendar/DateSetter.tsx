import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { setToday } from "reducers/CalendarSlice";
import { calendarSelector } from "selectors/selectors";
import moment from "moment";

const DateSetter = () => {
  const { today } = useSelector(calendarSelector);
  const dispatch = useDispatch();

  const todayMoment = moment(today);

  return (
    <Formik
      initialValues={{
        year: todayMoment.year(),
        month: todayMoment.month(),
        day: todayMoment.date(),
      }}
      onSubmit={({ year, month, day }, { setSubmitting }) => {
        setSubmitting(false);
        dispatch(setToday(moment(new Date(year, month, day))));
      }}
    >
      <Form>
        <label htmlFor="year">year</label>
        <Field name="year" type="number" />
        <br />
        <label htmlFor="month">month</label>
        <Field name="month" type="number" />
        <br />
        <label htmlFor="day">day</label>
        <Field name="day" type="number" />
        <br />
        <button type="submit">Set date</button>
      </Form>
    </Formik>
  );
};

export default DateSetter;
