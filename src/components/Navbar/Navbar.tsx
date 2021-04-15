import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { userSelector } from "selectors/selectors";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  place-items: baseline center;
  grid-template: "homeLink apartmentsLink bookingsLink contactsOrCustomersLink userName" 1fr / 3fr 1fr auto 1fr 1fr;
  padding: 2px;
  font-size: 1.3em;
` as any;

const EmptyContainer = styled(Container)`
  height: 10vh;
`;

const BaseLink = styled(NavLink)`
  margin: 1em 1em 0 1em;
  padding-bottom: 8px;
  justify-items: end;
  border-bottom: 2px solid transparent;
  text-transform: uppercase;
  text-decoration: none;
  color: white;
  font-size: 120%;
  &:hover {
    border-bottom: 2px solid orange;
    transition: border-bottom 0.2s, color 0.2s;
  }
`;

const HomeLink = styled(BaseLink)`
  grid-area: homeLink;
  justify-self: start;
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
`;

const Navbar = ({ className }: any) => {
  const user = useSelector(userSelector).userData;
  if (!user) {
    return <EmptyContainer></EmptyContainer>;
  } else {
    return (
      <Container className={className}>
        <HomeLink to="/">AtlasHouse</HomeLink>
        <ApartmentsLink to="/apartments">Apartments</ApartmentsLink>
        {user.role !== 0 ? (
          <BookingsLink to="/bookings">Bookings</BookingsLink>
        ) : null}
        <ContactsOrCustomersLink
          to={user.role !== 2 ? "/contacts" : "/customers"}
        >
          {user.role !== 2 ? "Contacts" : "Customers"}
        </ContactsOrCustomersLink>

        {user.role === 0 ? (
          <UserLink to="/auth">Sign in</UserLink>
        ) : (
          <UserLink to="/profile">{user.firstName}</UserLink>
        )}
      </Container>
    );
  }
};

export default Navbar;
