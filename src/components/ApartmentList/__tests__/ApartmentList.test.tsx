import { prettyDOM, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import ApartmentList from "../ApartmentList";
import propertyReducer from "../../../reducers/PropertySlice";
import { configureStore } from "@reduxjs/toolkit";
import store from "../../../store/store";
import rootReducer from "store/rootReducer";
import api from "api/axiosInstance";
import { setupServer } from "msw/node";
import { rest } from "msw";

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
// jest.spyOn(api, "get").mockImplementation(async (path) => {
//   console.log(path);
//   if (path === "/properties") {
//     return {
//       response: {
//         data: [
// { name: "name", available: true, price: "32" },
// { name: "name2", available: true, price: "32" },
//         ],
//       },
//     };
//   }
// });

test("renders listings from store", async () => {
  render(
    <Provider store={store}>
      <ApartmentList />
    </Provider>
  );
  const query = await screen.findAllByTestId("listing");
  expect(query.length).toBe(mockProperties.length);
});
