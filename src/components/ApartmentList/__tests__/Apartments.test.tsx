import { generateApartment, render, screen, waitFor } from "testUtils";
import userEvent from "@testing-library/user-event";
import api from "api/axiosInstance";
import moment from "moment";
import Apartments from "../Apartments";
import * as slice from "../PropertySlice";

const customRender = () => render(<Apartments />);

const aprtmGenerationArr = [
  { checkIn: "2021-01-01", checkOut: "2021-01-06", name: "InRange" },
  { checkIn: "2020-12-20", checkOut: "2020-12-30", name: "BeforeRange" },
  { checkIn: "2021-01-08", checkOut: "2021-01-15", name: "AfterRange" },
  { checkIn: "2020-12-27", checkOut: "2021-01-03", name: "IntoRange" },
  { checkIn: "2021-01-04", checkOut: "2021-01-09", name: "FromRange" },
  { checkIn: "2020-12-27", checkOut: "2021-01-09", name: "AroundRange" },
];

let apartments: any[] = [];

let i = 0;
aprtmGenerationArr.forEach((element) => {
  apartments[i] = generateApartment(
    moment(element.checkIn).toISOString(),
    moment(element.checkOut).toISOString(),
    element.name
  );
  i++;
});

test("displays a correct selection of apartments by date", async () => {
  jest.spyOn(api, "get").mockResolvedValueOnce({ data: apartments });
  const propSpy = jest.spyOn(slice, "setProperties");
  customRender();
  await screen.findByText("InRange");
  screen.getByText("BeforeRange");
  screen.getByText("AfterRange");
  screen.getByText("IntoRange");
  screen.getByText("FromRange");
  screen.getByText("AroundRange");

  await waitFor(() => expect(propSpy).toHaveBeenCalledWith(apartments));

  userEvent.type(
    screen.getByLabelText("From:"),
    moment("2021-01-01").format("yyyy-MM-DD")
  );
  userEvent.type(
    screen.getByLabelText("To:"),
    moment("2021-01-07").format("yyyy-MM-DD")
  );
  userEvent.click(screen.getByText("Search Apartments"));

  await screen.findByText("BeforeRange");
  await screen.findByText("AfterRange");
  screen.debug();
  expect(screen.queryByText("InRange")).not.toBeInTheDocument();
  // expect(screen.queryByText("IntoRange")).not.toBeInTheDocument();
  // expect(screen.queryByText("FromRange")).not.toBeInTheDocument();
  // expect(screen.queryByText("AroundRange")).not.toBeInTheDocument();
});
