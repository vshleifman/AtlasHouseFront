import NavBar from "components/NavBar";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Authentication";
import Contacts from "pages/Contacts";
import Rooms from "pages/Rooms";
import Calendar from "components/Calendar/Calendar";

const App = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/auth" component={Auth} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/rooms" component={Rooms} />
        <Route path="/calendar" component={Calendar} />
      </Switch>
    </div>
  );
};
export default App;
