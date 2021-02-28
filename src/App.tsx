import NavBar from "components/NavBar";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Authentication";
import { useDispatch } from "react-redux";
import { signoutThunk } from "reducers/AuthSlice";

const App = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <NavBar />
      <button
        onClick={() => {
          dispatch(signoutThunk());
        }}
      >
        signout
      </button>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/auth" component={Auth} />
      </Switch>
    </div>
  );
};
export default App;
