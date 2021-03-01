import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { userSelector } from "selectors/selectors";

const NavBar = () => {
  const user = useSelector(userSelector);

  return (
    <div>
      <ul>
        <li>
          <NavLink to="/">AtlasHouse</NavLink>
        </li>
        <li>
          <NavLink to="/rooms">View Rooms</NavLink>
        </li>
        <li>
          <NavLink to="/contacts">Contact Us</NavLink>
        </li>
        <li>
          {user.userData.__t ? (
            "User Name"
          ) : (
            <NavLink to="/auth">Sign In</NavLink>
          )}
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
