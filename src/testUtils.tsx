import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import store from "store/store";
import { createMemoryHistory } from "history";

const render = (ui: JSX.Element, options = { routes: ["/"] }) => {
  const history = createMemoryHistory({ initialEntries: options.routes });
  return {
    ...rtlRender(
      <Provider store={store}>
        <Router history={history}>{ui}</Router>
      </Provider>
    ),
    history,
  };
};
export * from "@testing-library/react";

export { render };
