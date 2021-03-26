import { generateApartment, render, screen, waitFor } from "testUtils";
import userEvent from "@testing-library/user-event";
import api from "api/axiosInstance";
import moment from "moment";
import Apartments from "../Apartments";
import * as slice from "../PropertySlice";

const customRender = () => render(<Apartments />);
const InRange = generateApartment(
  moment("2021-01-01").toISOString(),
  moment("2021-01-06").toISOString(),
  "InRange"
);
const BeforeRange = generateApartment(
  moment("2020-12-20").toISOString(),
  moment("2020-12-30").toISOString(),
  "BeforeRange"
);
const AfterRange = generateApartment(
  moment("2021-01-08").toISOString(),
  moment("2021-01-15").toISOString(),
  "AfterRange"
);
const IntoRange = generateApartment(
  moment("2020-12-27").toISOString(),
  moment("2021-01-03").toISOString(),
  "IntoRange"
);
const FromRange = generateApartment(
  moment("2021-01-04").toISOString(),
  moment("2021-01-09").toISOString(),
  "FromRange"
);
const AroundRange = generateApartment(
  moment("2020-12-27").toISOString(),
  moment("2021-01-09").toISOString(),
  "AroundRange"
);

const apartments = [
  InRange,
  BeforeRange,
  AfterRange,
  IntoRange,
  FromRange,
  AroundRange,
];

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
  expect(screen.queryByText("InRange")).not.toBeInTheDocument();
  expect(screen.queryByText("IntoRange")).not.toBeInTheDocument();
  expect(screen.queryByText("FromRange")).not.toBeInTheDocument();
  expect(screen.queryByText("AroundRange")).not.toBeInTheDocument();
});
