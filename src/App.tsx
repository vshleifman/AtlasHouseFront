import Navbar from "./components/Navbar/Navbar";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Authentication";
import Contacts from "pages/Contacts";
import Apartments from "pages/Apartments";
import ProfilePage from "pages/ProfilePage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { tryAutoSignin } from "reducers/AuthSlice";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template: "nav nav nav" 1fr " . switch . " auto / 1fr 9fr 1fr;
`;

const StNavbar = styled.div`
  display: grid;
  margin-bottom: 20px;
  grid-area: nav;
`;
const StSwitch = styled.div`
  grid-area: switch;
  display: grid;
`;

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(tryAutoSignin());
  }, [dispatch]);
  return (
    <Container>
      <StNavbar>
        <Navbar />
      </StNavbar>
      <StSwitch>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/auth" component={Auth} />
          <Route path="/contacts" component={Contacts} />
          <Route path="/apartments" component={Apartments} />
          <Route path="/profile" component={ProfilePage} />
        </Switch>
      </StSwitch>
    </Container>
  );
};
export default App;
