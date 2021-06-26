import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { userSelector } from 'selectors/selectors';
import tw, { styled } from 'twin.macro';

const Container = styled.div`
  a:after {
    background: none repeat scroll 0 0 transparent;
    position: absolute;
    left: 50%;
    bottom: 0;
    display: block;
    content: '';
    height: 2px;
    background: orange;
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 0;
  }
  a:hover:after {
    width: 150%;
    left: -25%;
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
  }
`;

const BaseLink = styled(NavLink)`
  ${tw`relative mt-0.5 mx-4 pb-1 uppercase no-underline flex-grow text-white transition-all duration-200`}
`;

const Navbar = () => {
  const user = useSelector(userSelector).userData;

  return (
    <Container>
      <div tw="text-2xl mx-4 flex items-center height[10vh] p-0.5 justify-between">
        <div tw="flex-grow[2]">
          <BaseLink tw="text-4xl" to="/">
            AtlasHouse
          </BaseLink>
        </div>
        <div>
          <BaseLink to="/about">About Us</BaseLink>
          {user?.role === 2 ? <BaseLink to="/bookings">Bookings</BaseLink> : null}
          <BaseLink to={user?.role !== 2 ? '/contacts' : ''}>{user?.role !== 2 ? 'Contacts' : null}</BaseLink>
        </div>
        <div tw="text-align[end] border-left[cyan 1px solid]">
          {user?.role === 0 ? (
            <BaseLink to="/auth">Sign in</BaseLink>
          ) : (
            <BaseLink to="/profile">{user?.firstName}</BaseLink>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
