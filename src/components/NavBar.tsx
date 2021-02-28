import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userSelector } from "selectors/selectors";

const NavBar = () => {
  const user = useSelector(userSelector);

  return (
    <div>
      <p>Navbar</p>
      <p>{user.userData.__t ? "username" : <Link to="/auth">auth</Link>}</p>
    </div>
  );
};

export default NavBar;
