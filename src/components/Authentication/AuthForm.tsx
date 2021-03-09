import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { tryAutoSignin } from "reducers/AuthSlice";
import SigninFrom from "./SigninForm";
import SignupFrom from "./SignupForm";

const AuthForm = () => {
  const dispatch = useDispatch();

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
