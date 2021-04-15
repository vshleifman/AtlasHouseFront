import { render, screen } from "testUtils";
import Navbar from "../Navbar";
import * as redux from "react-redux";

const customRender = () => render(<Navbar />);

beforeEach(() => {
  jest.restoreAllMocks();
});

it("renders the navbar for Guest", () => {
  jest
    .spyOn(redux, "useSelector")
    .mockReturnValueOnce({ userData: { role: 0 } });
  customRender();
  screen.getByText("AtlasHouse");
  screen.getByText("Apartments");
  screen.getByText("Contacts");
  screen.getByText("Sign in");
});

it("renders the navbar for Admin", () => {
  jest
    .spyOn(redux, "useSelector")
    .mockReturnValueOnce({ userData: { role: 2, firstName: "Admin" } });

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
    .mockReturnValueOnce({ userData: { role: 1, firstName: "User" } });

  customRender();
  screen.getByText("AtlasHouse");
  screen.getByText("Apartments");
  screen.getByText("Contacts");
  screen.getByText("Bookings");
  screen.getByText("User");
});
