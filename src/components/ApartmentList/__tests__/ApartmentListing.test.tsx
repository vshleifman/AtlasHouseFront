import { generateApartment, render, screen } from "testUtils";
import moment from "moment";
import ApartmentListing from "../ApartmentListing";
import { Apartment } from "types/types";

const customRender = (apartment: Apartment) =>
  render(<ApartmentListing apartment={apartment} />);

test("renders listing with props", () => {
  const apartment = generateApartment(
    moment().add(1, "day").add(20, "millisecond").toISOString()
  );
  customRender(apartment);

  screen.getByText(apartment.name);
  screen.getByText("Available");
  screen.getByText(apartment.price);
});

test('if checkIn is today or eralier and checkOut is today or later, shows "unavailable"', () => {
  const apartment = generateApartment();
  customRender(apartment);

  screen.getByText("Not Available");
});
