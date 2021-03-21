import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { userSelector } from "selectors/selectors";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  place-items: baseline;
  grid-template: "homeLink apartmentsLink bookingsLink contactsOrCustomersLink userName" 1fr / 2fr 1fr 1fr 1fr 3fr;
  border: 1px solid black;
  padding: 2px;
`;

const BaseLink = styled(NavLink)`
  margin: 0 1em 0 1em;
`;

const HomeLink = styled(BaseLink)`
  grid-area: homeLink; ;
`;
const ApartmentsLink = styled(BaseLink)`
  grid-area: apartmentsLink; ;
`;
const BookingsLink = styled(BaseLink)`
  grid-area: bookingsLink; ;
`;
const ContactsOrCustomersLink = styled(BaseLink)`
  grid-area: contactsOrCustomersLink; ;
`;
const UserLink = styled(BaseLink)`
  grid-area: userName;
  text-decoration: none;
  place-self: end; ;
`;

const Navbar = () => {
  const userType = useSelector(userSelector).userData.__t;

  return (
    <Container>
      <HomeLink to="/">AtlasHouse</HomeLink>
      <ApartmentsLink to="/apartments">Apartments</ApartmentsLink>
      {userType !== "Guest" ? (
        <BookingsLink to="/bookings">Bookings</BookingsLink>
      ) : null}
      <ContactsOrCustomersLink
        to={userType !== "Admin" ? "/contacts" : "/customers"}
      >
        {userType !== "Admin" ? "Contacts" : "Customers"}
      </ContactsOrCustomersLink>

      {userType === "Guest" ? (
        <UserLink to="/auth">Sign in</UserLink>
      ) : (
        <UserLink to="/profile">{userType}</UserLink>
      )}
    </Container>
  );
};

export default Navbar;
