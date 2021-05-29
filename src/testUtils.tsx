import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createStoreInstance } from 'store/store';
import { createMemoryHistory } from 'history';
import moment from 'moment';
import { checkTimes } from 'types/types';

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
    codeID: `${Math.floor(Math.random() * 10)}`,
    createdAt: moment().toISOString(),
    updatedAt: moment().toISOString(),
    price: 333,
    isCleaned: false,
    id: 'id1234567890abcd',
    pictures: [],
    amenities: {},
    description: 'testDesc',
    bookings: [
      {
        checkIn: moment(checkIn).hour(checkTimes.checkIn).minute(0).second(0).toISOString(),
        checkOut: moment(checkOut).hour(checkTimes.checkOut).minute(0).second(0).toISOString(),
        createdAt: moment().toISOString(),
        updatedAt: moment().toISOString(),
        property: 'id1234567890abcd',
        user: 'testUser',
        paidFor: false,
        amount: 1,
      },
    ],
  };
};

export * from '@testing-library/react';

export { render };
