import NavBar from "components/NavBar";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Authentication";
import Contacts from "pages/Contacts";
import Rooms from "pages/Rooms";
import Calendar from "components/Calendar";
import styled from "styled-components";
import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment";

const Cell = styled.div`
  height: 2em;
  border: 1px solid black;
  display: grid;
`;

const BodyCell = styled(Cell)`
  &:hover {
    border-left: 3px solid blue;
    border-right: 3px solid blue;
  }
`;

const Body = styled.div`
  display: grid;
  grid-area: cells;
`;

const DateCell = styled(Cell)`
  justify-items: center;
  height: 1.2em;
`;

const MonthRow = styled.div`
  display: grid;
  grid-area: monthRow;
`;

const WeekCell = styled(Cell)`
  font-size: 0.7em;
  place-content: center;
  height: auto;
`;

const WeekRow = styled(MonthRow)<{ column: number }>`
  grid-area: weekRow;
  grid-template-columns: repeat(${(props) => props.column}, 1fr);
`;

const RoomCell = styled(Cell)``;

const RoomColumn = styled.div`
  display: grid;
  grid-area: roomColumn;
`;

//------------------------------------------
//------------------------------------------

const App = () => {
  moment.updateLocale("en", {
    weekdaysShort: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
  });

  const [calView, setCalView] = useState("month");

  const [{ year, month, day }, setDate] = useState({
    year: moment().year(),
    month: moment().month(),
    day: moment().days(),
  });

  let currentDay = new Date(year, month, day);
  // console.log(currentDay.add(2, "days").toDate());

  let dateCells = [];
  let weekCells = [];
  let roomCells = [];
  let cells = [];

  const rooms = ["32b", "33a", "54a", "72b", "12a"];

  const daysInMonth = moment(currentDay).daysInMonth();

  const getColumnsCount = (calView: string) => {
    switch (calView) {
      case "1week":
        return 7;
      case "2weeks":
        return 14;
      default:
        return daysInMonth;
    }
  };

  const columnsCount = getColumnsCount(calView); //as prop from separate component
  const rowsCount = rooms.length;

  let iterationOverPeriodCounter = 1;

  for (let i = 1; i <= columnsCount * rowsCount; i++) {
    if ((i - 1) / (columnsCount * iterationOverPeriodCounter) === 1) {
      iterationOverPeriodCounter++;
    }

    let dayCounterAcrossRows =
      i <= columnsCount
        ? i
        : i - columnsCount * (iterationOverPeriodCounter - 1);
    console.log({ dayCounterAcrossRows });

    currentDay.setDate(dayCounterAcrossRows);

    const currentWeekDay = moment(currentDay).format("ddd");

    cells.push(
      <BodyCell //separate component; not "id"
        style={currentWeekDay === "SUN" ? { backgroundColor: "gray" } : {}}
        key={`bc${i}`}
        id={`room${
          rooms[iterationOverPeriodCounter - 1]
        }, day${dayCounterAcrossRows}`}
      ></BodyCell>
    );

    if (i <= columnsCount) {
      // console.log(currentDay.add(1, "days").format("D"));

      dateCells.push(<DateCell key={`dc${i}`}>{i}</DateCell>);

      weekCells.push(<WeekCell key={`wc${i}`}>{currentWeekDay}</WeekCell>);
    }

    if (i <= rowsCount) {
      roomCells.push(<RoomCell key={`rc${i}`}>{rooms[i - 1]}</RoomCell>);
    }
  }

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplate: `"month monthRow" 1fr "month weekRow" 1fr "roomColumn cells" auto / 4em auto`,
        }}
      >
        <div
          style={{
            display: "grid",
            gridArea: "month",
          }}
        >
          {currentDay.getMonth()}
        </div>
        <WeekRow column={columnsCount}>{weekCells}</WeekRow>{" "}
        {/*check styled variables; tailwind*/}
        <MonthRow
          style={{ gridTemplateColumns: `repeat(${columnsCount}, 1fr)` }}
        >
          {dateCells}
        </MonthRow>
        <RoomColumn
          style={{
            gridTemplateRows: `repeat(${rowsCount}, 2em)`,
          }}
        >
          {roomCells}
        </RoomColumn>
        <Body
          style={{
            gridTemplateRows: `repeat(${rowsCount}, 2em)`,
            gridTemplateColumns: `repeat(${columnsCount}, 1fr)`,
          }}
        >
          {cells}
        </Body>
      </div>
      <br />
      <div>
        {" "}
        {/*separate component*/}
        Change View:
        <button
          onClick={() => {
            setCalView("1week");
          }}
        >
          1 week
        </button>
        <button
          onClick={() => {
            setCalView("2weeks");
          }}
        >
          2 weeks
        </button>
        <button
          onClick={() => {
            setCalView("month");
          }}
        >
          month
        </button>
      </div>
      <br />
      <div>
        {/*separate component*/}
        <Formik
          initialValues={{
            year,
            month,
            day,
          }}
          onSubmit={({ year, month, day }, { setSubmitting }) => {
            setSubmitting(false);
            setDate({ year, month, day });
          }}
        >
          <Form>
            <label htmlFor="year">year</label>
            <Field name="year" type="number" />
            <ErrorMessage name="year" />
            <br />
            <label htmlFor="month">month</label>
            <Field name="month" type="number" />
            <ErrorMessage name="month" />
            <br />
            <label htmlFor="day">day</label>
            <Field name="day" type="number" />
            <ErrorMessage name="day" />
            <br />
            <button type="submit">Set date</button>
          </Form>
        </Formik>
      </div>
    </div>

    // <div>
    //   <div>
    //     {/* <NavBar /> */}
    //     <Switch>
    //       <Route exact path="/" component={Home} />
    //       <Route path="/auth" component={Auth} />
    //       <Route path="/contacts" component={Contacts} />
    //       <Route path="/rooms" component={Rooms} />
    //       <Route path="/calendar" component={Calendar} />
    //     </Switch>
    //   </div>
    //   <br />
    //   <br />
    //   <br />
    //   <br />
    // </div>
  );
};
export default App;
