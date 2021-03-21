import { render, screen, waitFor } from "testUtils";
import Navbar, * as navbar from "../Navbar";
import * as redux from "react-redux";

const customRender = () => render(<Navbar />);

beforeEach(() => {
  jest.restoreAllMocks();
});

it("renders the navbar for Guest", () => {
  jest
    .spyOn(redux, "useSelector")
    .mockReturnValueOnce({ userData: { __t: "Guest" } });
  customRender();
  screen.getByText("AtlasHouse");
  screen.getByText("Apartments");
  screen.getByText("Contacts");
  screen.getByText("Sign in");
});

it("renders the navbar for Admin", () => {
  jest
    .spyOn(redux, "useSelector")
    .mockReturnValueOnce({ userData: { __t: "Admin" } });

  customRender();
  screen.getByText("AtlasHouse");
  screen.getByText("Apartments");
  screen.getByText("Bookings");
  screen.getByText("Customers");
  screen.getByText("Admin");

  expect(screen.queryByText("Sign in")).not.toBeInTheDocument();
});

it("renders the navbar for User", () => {
  jest
    .spyOn(redux, "useSelector")
    .mockReturnValueOnce({ userData: { __t: "User" } });

  customRender();
  screen.getByText("AtlasHouse");
  screen.getByText("Apartments");
  screen.getByText("Contacts");
  screen.getByText("Bookings");
  screen.getByText("User");
});
