import Navbar from "components/Navbar/Navbar";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Authentication";
import Contacts from "pages/Contacts";
import Apartments from "pages/Apartments";
import Calendar from "components/Calendar/Calendar";
import ProfilePage from "pages/ProfilePage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { tryAutoSignin } from "reducers/AuthSlice";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(tryAutoSignin());
  }, [dispatch]);
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/auth" component={Auth} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/apartments" component={Apartments} />
        <Route path="/profile" component={ProfilePage} />
        {/* <Route path="/calendar" component={Calendar} /> */}
      </Switch>
    </div>
  );
};
export default App;
