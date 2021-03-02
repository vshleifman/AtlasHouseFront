import NavBar from "components/NavBar";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Authentication";
import Contacts from "pages/Contacts";
import Rooms from "pages/Rooms";
import Calendar from "components/Calendar";
import styled from "styled-components";

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

const WeekRow = styled(MonthRow)`
  grid-area: weekRow;
`;

const RoomCell = styled(Cell)``;

const RoomColumn = styled.div`
  display: grid;
  grid-area: roomColumn;
`;

const App = () => {
  let dateCells = [];
  let weekCells = [];
  let roomCells = [];
  let cells = [];

  const rooms = ["32b", "33a", "54a", "72b", "12a"];

  let currentDay = new Date(2021, 2, 1);

  const getDaysInMonth = (year: number, month: number) => {
    const date = new Date(year, month + 1, 0);
    return date.getDate();
  };

  const getWeekDay = () => {
    const day = currentDay.getDay();
    switch (day) {
      case 0:
        return "SUN";
      case 1:
        return "MON";
      case 2:
        return "TUE";
      case 3:
        return "WED";
      case 4:
        return "THR";
      case 5:
        return "FRI";
      case 6:
        return "SAT";
    }
  };

  const columnsN = getDaysInMonth(
    currentDay.getFullYear(),
    currentDay.getMonth()
  );
  const rowsN = rooms.length;

  let iterationOverMonthCounter = 1;

  for (let i = 1; i <= columnsN * rowsN; i++) {
    if ((i - 1) / (columnsN * iterationOverMonthCounter) === 1) {
      iterationOverMonthCounter++;
    }

    let dayCounterAcrossRows =
      i <= columnsN ? i : i - columnsN * (iterationOverMonthCounter - 1);

    currentDay.setDate(dayCounterAcrossRows);

    cells.push(
      <BodyCell
        style={getWeekDay() === "SUN" ? { backgroundColor: "gray" } : {}}
        key={`bc${i}`}
        id={`room${
          rooms[iterationOverMonthCounter - 1]
        }, day${dayCounterAcrossRows}`}
      ></BodyCell>
    );

    if (i <= columnsN) {
      dateCells.push(<DateCell key={`dc${i}`}>{i}</DateCell>);

      weekCells.push(<WeekCell key={`wc${i}`}>{getWeekDay()}</WeekCell>);
    }

    if (i <= rowsN) {
      roomCells.push(<RoomCell key={`rc${i}`}>{rooms[i - 1]}</RoomCell>);
    }
  }

  return (
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
        February
      </div>
      <WeekRow style={{ gridTemplateColumns: `repeat(${columnsN}, 1fr)` }}>
        {weekCells}
      </WeekRow>
      <MonthRow style={{ gridTemplateColumns: `repeat(${columnsN}, 1fr)` }}>
        {dateCells}
      </MonthRow>
      <RoomColumn
        style={{
          gridTemplateRows: `repeat(${rowsN}, 2em)`,
        }}
      >
        {roomCells}
      </RoomColumn>
      <Body
        style={{
          gridTemplateRows: `repeat(${rowsN}, 2em)`,
          gridTemplateColumns: `repeat(${columnsN}, 1fr)`,
        }}
      >
        {cells}
      </Body>
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
