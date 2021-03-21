import { render, screen, waitFor } from "testUtils";
import SigninForm from "../SigninForm";
import * as authSlice from "reducers/AuthSlice";
import * as userSlice from "reducers/UserSlice";
import userEvent from "@testing-library/user-event";
import api from "api/axiosInstance";

beforeEach(() => {
  jest.restoreAllMocks();
});

const customRender = () => render(<SigninForm />);

it("renders signin form", () => {
  customRender();
  screen.getByText("Email");
  screen.getByText("Password");
  screen.getByText("Sign in");
});

it("signs in the user", async () => {
  jest
    .spyOn(api, "post")
    .mockResolvedValueOnce({ data: { token: "ttokken", user: "User" } });
  const spyAuthSlice = jest.spyOn(authSlice, "authThunk");
  const spyUserSlice = jest.spyOn(userSlice, "setUser");

  const { history } = customRender();
  history.push("/auth");

  userEvent.type(screen.getByLabelText("Email"), "email@gmail.com");
  userEvent.type(screen.getByLabelText("Password"), "password");
  userEvent.click(screen.getByText("Sign in"));
  await waitFor(() => expect(spyUserSlice).toHaveBeenCalledWith("User"));
  await waitFor(() =>
    expect(spyAuthSlice).toHaveBeenCalledWith(
      "in",
      {
        user: { email: "email@gmail.com", password: "password" },
      },
      history
    )
  );
  await waitFor(() => expect(history.location.pathname).toBe("/"));
});

it("prevents thunk call with validation", async () => {
  const spyAuthSlice = jest.spyOn(authSlice, "authThunk");
  const { history } = customRender();
  history.push("auth");

  userEvent.click(screen.getByText("Sign in"));
  await waitFor(() => expect(spyAuthSlice).not.toHaveBeenCalled());
  expect(history.location.pathname).toBe("/auth");
});

// it("fails with wrong auth", async () => {
//   const errorMsg = "401 Unauthorized";
//   jest
//     .spyOn(api, "post")
//     .mockRejectedValue({ response: { data: { msg: errorMsg } } });

//   customRender();

//   userEvent.type(screen.getByLabelText("Email"), "email@gmail.com");
//   userEvent.type(screen.getByLabelText("Password"), "password");
//   userEvent.click(screen.getByText("Sign in"));

//   await waitFor(() =>
//     expect(history.location.pathname).not.toBe("/auth")
//   );
// }); //unnecessary??
