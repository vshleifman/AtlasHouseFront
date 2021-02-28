import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { tryAutoSignin } from "reducers/AuthSlice";
import { userSelector } from "selectors/selectors";
import SigninFrom from "./SigninForm";
import SignupFrom from "./SignupForm";

const AuthForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  const history = useHistory();

  useEffect(() => {
    dispatch(tryAutoSignin());
  }, [dispatch]);

  const [isSingin, setIsSingin] = useState(true);

  return (
    <div>
      {isSingin === true ? <SigninFrom /> : <SignupFrom />}
      <br />
      <button onClick={() => setIsSingin(!isSingin)}>{`Sign ${
        isSingin ? "up" : "in"
      } instead`}</button>
    </div>
  );
};

export default AuthForm;
