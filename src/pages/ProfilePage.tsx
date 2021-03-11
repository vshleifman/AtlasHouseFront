import { useDispatch, useSelector } from "react-redux";
import { signoutThunk } from "reducers/AuthSlice";
import { userSelector } from "selectors/selectors";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const userData = useSelector(userSelector);
  return (
    <div>
      me: {JSON.stringify(userData.userData)}
      <button
        onClick={() => {
          dispatch(signoutThunk());
        }}
      >
        Signout
      </button>
    </div>
  );
};

export default ProfilePage;
