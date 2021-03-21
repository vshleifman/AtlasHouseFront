import AuthForm from "../AuthForm";
import * as slice from "reducers/AuthSlice";
import { render, screen } from "testUtils";
import userEvent from "@testing-library/user-event";
const customRender = () => {
  render(<AuthForm />);
};

test("renders correct auth form", () => {
  const spySlice = jest.spyOn(slice, "tryAutoSignin");
  customRender();
  expect(spySlice).toHaveBeenCalledTimes(1);
  const swap = screen.getByText("Sign up instead");
  userEvent.click(swap);
  expect(swap).toHaveTextContent("Sign in instead");
});
