import Navbar from './components/Navbar/Navbar';
import { Route, Switch, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Contacts from 'pages/Contacts';
import ProfilePage from 'pages/ProfilePage';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { tryAutoSignin } from 'reducers/AuthSlice';
import styled, { createGlobalStyle } from 'styled-components';
import Welcome from 'components/Navbar/Welcome';
import AuthForm from 'components/Authentication/AuthForm';
import ApartmentsSwitch from 'components/ApartmentList/ApartmentsSwitch';
import rigaPanorama from 'images/Riga_panorama.jpg';
import AddApartment from 'components/ApartmentList/AddApartment';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Playfair Display', serif;
  }

  a {
    &:hover {
      text-decoration: none;
    }
  }
`;

const Container = styled.div`
  display: grid;
  grid-template: 'nav nav nav' auto ' . switch . ' auto ' . . .' 5em / 1fr 3fr 1fr;
  font-family: 'Playfair Display';
  font-size: 1.8vh;
`;

const StSwitch = styled.div`
  grid-area: switch;
  margin-top: 2em;
  display: grid;
`;

const NavBackground = styled.header`
  grid-area: nav;
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${rigaPanorama}');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  height: ${(props: any) => props.height};
` as any;

const App = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    dispatch(tryAutoSignin());
  }, [dispatch]);

  const ref = useRef(null);

  return (
    <Container>
      <GlobalStyles />
      <NavBackground height={location.pathname === '/' ? '100vh' : '10vh'}>
        <Navbar />
        {location.pathname === '/' ? <Welcome reference={ref} /> : null}
      </NavBackground>

      <StSwitch>
        <Switch>
          <Route exact path="/" render={() => <Home reference={ref} />} />
          <Route path="/auth" component={AuthForm} />
          <Route path="/contacts" component={Contacts} />
          <Route path="/apartments" component={ApartmentsSwitch} />
          <Route path="/add_apartment" component={AddApartment} />
          <Route path="/profile" component={ProfilePage} />
        </Switch>
      </StSwitch>
    </Container>
  );
};
export default App;
