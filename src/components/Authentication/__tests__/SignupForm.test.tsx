import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "testUtils";
import SignupForm from "../SignupForm";
import * as authSlice from "reducers/AuthSlice";
import api from "api/axiosInstance";
import * as userSlice from "reducers/UserSlice";

beforeEach(() => {
  jest.restoreAllMocks();
});

const customRender = () => render(<SignupForm />);

it("renders signup form", () => {
  customRender();
  screen.getByText("Email");
  screen.getByText("Password");
  screen.getByText("First Name");
  screen.getByText("Last Name");
  screen.getByText("Sign up");
});

it("prevents thunk call with validation", async () => {
  const { history } = customRender();
  history.push("auth");

  const spySignupThunk = jest.spyOn(authSlice, "authThunk");
  userEvent.click(screen.getByText("Sign up"));
  await waitFor(() => expect(spySignupThunk).not.toHaveBeenCalled());
  expect(history.location.pathname).toBe("/auth");
});

it("signs up a user", async () => {
  jest
    .spyOn(api, "post")
    .mockResolvedValue({ data: { token: "token", user: "User" } });
  const spyAuth = jest.spyOn(authSlice, "authThunk");
  const spyUser = jest.spyOn(userSlice, "setUser");

  const { history } = customRender();
  history.push("auth");

  userEvent.type(screen.getByLabelText("Email"), "email@gmail.com");
  userEvent.type(screen.getByLabelText("Password"), "password");
  userEvent.type(screen.getByLabelText("First Name"), "firstName");
  userEvent.type(screen.getByLabelText("Last Name"), "lastName");
  userEvent.click(screen.getByText("Sign up"));
  await waitFor(() =>
    expect(spyAuth).toHaveBeenCalledWith(
      "up",
      {
        email: "email@gmail.com",
        password: "password",
        firstName: "firstName",
        lastName: "lastName",
      },
      history
    )
  );
  await waitFor(() => expect(spyUser).toHaveBeenCalledWith("User"));
  expect(history.location.pathname).toBe("/");
});
