import NavBar from "components/NavBar";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Authentication";
import Contacts from "pages/Contacts";
import Rooms from "pages/Rooms";
import Calendar from "components/Calendar";

const App = () => {
  let dateCells = [];
  let roomCells = [];
  let cells = [];
  const rooms = ["32b", "33a", "54a", "72b", "12a"];
  rooms.sort();

  const columnsN = 28;
  const rowsN = rooms.length;

  let iterationOverMonthCounter = 1;
  for (let i = 1; i <= columnsN * rowsN; i++) {
    if ((i - 1) / (columnsN * iterationOverMonthCounter) === 1) {
      iterationOverMonthCounter++;
    }

    cells.push(
      <div
        style={{ height: "2em", border: "1px solid black" }}
        id={
          i <= columnsN
            ? `room${rooms[iterationOverMonthCounter - 1]}, day${i}`
            : `room${rooms[iterationOverMonthCounter - 1]}, day${
                i - columnsN * (iterationOverMonthCounter - 1)
              }`
        }
      ></div>
    );
    if (i <= columnsN) {
      dateCells.push(
        <div
          style={{
            display: "grid",
            justifyItems: "center",
            border: "1px solid black",
          }}
        >
          {i}
        </div>
      );
    }
    if (i <= rowsN) {
      roomCells.push(
        <div style={{ height: "2em", border: "1px solid black" }}>
          {rooms[i - 1]}
        </div>
      );
    }
  }

  return (
    <div
      className="container"
      style={{
        // height: "500px",
        display: "grid",
        gridTemplate: `"month dateCells dateCells" 1fr "roomCells cells cells" 20fr / 1fr 10fr 10fr`,
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
      <div
        style={{
          display: "grid",
          gridArea: "dateCells",
          gridTemplateColumns: `repeat(${columnsN}, 1fr)`,
        }}
      >
        {dateCells}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateRows: `repeat(${rowsN}, 2em)`,
          gridArea: "roomCells",
        }}
      >
        {roomCells}
      </div>
      <div
        style={{
          // display='inline-grid',
          display: "grid",
          gridArea: "cells",
          gridTemplateColumns: `repeat(${columnsN}, 1fr)`,
          gridTemplateRows: `repeat(${rowsN}, 2em)`,
        }}
      >
        {cells}
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
