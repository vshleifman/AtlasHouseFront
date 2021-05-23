import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createStoreInstance } from 'store/store';
import { createMemoryHistory } from 'history';
import moment from 'moment';

export const testStore = createStoreInstance();

const render = (ui: JSX.Element, options = { routes: ['/'] }) => {
  const history = createMemoryHistory({ initialEntries: options.routes });
  return {
    ...rtlRender(
      <Provider store={testStore}>
        <Router history={history}>{ui}</Router>
      </Provider>,
    ),
    history,
  };
};

export const generateApartment = (
  checkIn = moment().add(2, 'days').toISOString(),
  checkOut = moment().add(2, 'week').toISOString(),
  name = 'testApartment',
) => {
  return {
    name,
    codeID: Math.floor(Math.random() * 10),
    createdAt: moment().toISOString(),
    updatedAt: moment().toISOString(),
    price: 333,
    isCleaned: false,
    id: 'id1234567890abcd',
    pictures: [],
    bookings: [
      {
        checkIn,
        checkOut,
        createdAt: moment().toISOString(),
        updatedAt: moment().toISOString(),
        property: 'id1234567890abcd',
        user: 'testUser',
        paidFor: false,
      },
    ],
  };
};

export * from '@testing-library/react';

export { render };
