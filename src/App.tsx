import AuthForm from "components/Authentication/AuthForm";
import { useDispatch } from "react-redux";
import { setUserThunk } from "reducers/UserSlice";

const App = () => {
  const dispatch = useDispatch();
  const getMe = () => {
    dispatch(setUserThunk());
    console.log("banana");
  };

  return (
    <div>
      <AuthForm />
      <button onClick={getMe}>get me</button>
    </div>
  );
};
export default App;
