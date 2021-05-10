import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { userSelector } from 'selectors/selectors';
import tw, { styled } from 'twin.macro';

const BaseLink = styled(NavLink)`
  ${tw`mt-0.5 mx-2 pb-1 border-b-2 border-color[transparent] uppercase no-underline flex-grow text-white
  hover:border-secondary transition-all duration-200
`}
`;

const Navbar = () => {
  const user = useSelector(userSelector).userData;

  return (
    <div tw="text-4xl flex items-center height[10vh] p-0.5 justify-between">
      <div>
        <BaseLink to="/">AtlasHouse</BaseLink>
      </div>
      <div>
        <BaseLink to="/apartments">Apartments</BaseLink>
        {user?.role !== 0 ? <BaseLink to="/bookings">Bookings</BaseLink> : null}
        <BaseLink to={user?.role !== 2 ? '/contacts' : '/customers'}>
          {user?.role !== 2 ? 'Contacts' : 'Customers'}
        </BaseLink>
      </div>
      <div tw="text-align[end]">
        {user?.role === 0 ? (
          <BaseLink to="/auth">Sign in</BaseLink>
        ) : (
          <BaseLink to="/profile">{user?.firstName}</BaseLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
