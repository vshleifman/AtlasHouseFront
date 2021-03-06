import Navbar from './components/Navbar/Navbar';
import { Route, Switch, useLocation } from 'react-router-dom';
import About from './pages/About';
import Contacts from 'pages/Contacts';
import ProfilePage from 'pages/ProfilePage';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { tryAutoSignin } from 'reducers/AuthSlice';
import styled from 'styled-components';
import Welcome from 'components/Navbar/Welcome';
import AuthForm from 'components/Authentication/AuthForm';
import ApartmentsSwitch from 'components/ApartmentList/ApartmentsSwitch';
import rigaPanorama from 'images/Riga_panorama.jpg';
import AddApartment from 'components/ApartmentList/AddApartments';
import tw from 'twin.macro';
import Bookings from 'components/Booking/ViewBookings/Bookings';
import { setPropertiesThunk } from 'components/ApartmentList/PropertyThunks';

const Container = styled.div`
  ${tw`flex flex-col items-center`}
  font-family: 'Playfair Display';
  font-size: 1.5rem;

  body {
    font-family: 'Playfair Display', serif;
  }

  a {
    &:hover {
      text-decoration: none;
    }
  }
`;

const NavBackground = styled.header`
  width: 100vw;
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
    dispatch(setPropertiesThunk());
  }, [dispatch]);

  const ref = useRef(null);

  return (
    <Container>
      <NavBackground height={location.pathname === '/' ? '100vh' : '10vh'}>
        <Navbar />
        {location.pathname === '/' ? <Welcome reference={ref} /> : null}
      </NavBackground>

      <Switch tw="mt-2 justify-center flex">
        <Switch>
          <Route exact path="/" render={() => <ApartmentsSwitch reference={ref} />} />
          <Route path="/auth" component={AuthForm} />
          <Route path="/contacts" component={Contacts} />
          <Route path="/apartments" component={ApartmentsSwitch} />
          <Route path="/add_apartment" component={AddApartment} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/bookings" component={Bookings} />
          <Route path="/about" component={About} />
        </Switch>
      </Switch>
    </Container>
  );
};
export default App;
