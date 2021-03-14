import { render, screen } from "@testing-library/react";
import ApartmentListing from "../ApartmentListing";

test("renders listing with props", () => {
  const apartment = { name: "testName", available: true, price: "100" };
  render(<ApartmentListing apartment={apartment} />);
  screen.getByText(apartment.name);
  screen.getByText(apartment.available.toString());
  screen.getByText(apartment.price);
});
