import { render, screen } from "testUtils";
import ApartmentList from "../ApartmentList";
import { setupServer } from "msw/node";
import { rest } from "msw";
import * as slice from "reducers/PropertySlice";

const mockProperties = [
  { name: "name", available: true, price: "32" },
  { name: "name2", available: true, price: "32" },
];

const server = setupServer(
  rest.get(
    "https://atlashouse.dev.vshleifman.co.uk/api/properties",
    (req, res, ctx) => {
      return res(ctx.json(mockProperties));
    }
  )
);
beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});
afterAll(() => {
  server.close();
});
afterEach(() => {
  server.resetHandlers();
});

test("renders listings from store", async () => {
  const spy = jest.spyOn(slice, "setPropertiesThunk");
  render(<ApartmentList />);

  const query = await screen.findAllByTestId("listing");
  expect(spy).toBeCalledTimes(1);
  expect(query.length).toBe(mockProperties.length);
});
