import userEvent from "@testing-library/user-event";
import DateSearchBar from "components/DateSearchBar";
import moment from "moment";
import * as slice from "../ApartmentList/PropertySlice";
import * as thunk from "../ApartmentList/PropertyThunks";
import { generateApartment, render, screen, waitFor } from "testUtils";
const apartment1 = generateApartment();
const apartment2 = generateApartment(
  moment().add(1, "w").toISOString(),
  moment().add(2, "w").toISOString(),
  "testApartment2"
);
const apartments = [apartment1, apartment2];
const customRender = () => render(<DateSearchBar apartments={apartments} />);

it("displays a selection of properties", async () => {
  const propSpy = jest.spyOn(slice, "setProperties");
  const thunkSpy = jest.spyOn(thunk, "setPropertiesThunk");

  customRender();
  // test with only one in range
  userEvent.type(
    screen.getByLabelText("From:"),
    moment().add(1, "week").add(1, "day").format("yyyy-MM-DD")
  );
  userEvent.type(
    screen.getByLabelText("To:"),
    moment().add(2, "week").format("yyyy-MM-DD")
  );
  userEvent.click(screen.getByText("Search Apartments"));

  await waitFor(() => {
    expect(propSpy).toHaveBeenNthCalledWith(1, [apartments[0]]);
  });

  //clear filter
  userEvent.click(screen.getByText("Reset Filters"));

  await waitFor(() => {
    expect(thunkSpy).toHaveBeenCalledTimes(1);
  });

  //test with both outside range
  userEvent.type(screen.getByLabelText("From:"), moment().format("yyyy-MM-DD"));
  userEvent.type(
    screen.getByLabelText("To:"),
    moment().add(3, "week").format("yyyy-MM-DD")
  );
  userEvent.click(screen.getByText("Search Apartments"));

  await waitFor(() => {
    expect(propSpy).toHaveBeenNthCalledWith(2, []);
  });
});
