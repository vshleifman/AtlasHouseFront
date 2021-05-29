import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { setUser } from 'reducers/UserSlice';
import { render, testStore } from 'testUtils';
import Filter from '../Filter';
import { FilterContext } from 'components/ApartmentList/FilterProvider';

const customRender = () => render(<Filter />);

it('renders select areas and buttons', () => {
  customRender();
  expect(screen.getByText('Sort By:')).toBeInTheDocument();
  expect(screen.getByText('Filter:')).toBeInTheDocument();
  screen.getAllByText('Select...').forEach(el => expect(el).toBeInTheDocument());
  expect(screen.getByText('Filter Apartments')).toBeInTheDocument();
  expect(screen.getByText('Reset Filters')).toBeInTheDocument();

  expect(screen.queryByText('+')).not.toBeInTheDocument();
});

it('renders the + if admin', () => {
  customRender();
  testStore.dispatch(
    setUser({
      isAdminGenerated: false,
      _id: '60ab6d9953c7a923ddb290ed',
      firstName: 'admin',
      lastName: 'adminovich',
      email: 'admin@test.com',
      createdAt: '2021-05-24T09:10:49.554Z',
      updatedAt: '2021-05-25T13:52:07.278Z',
      __v: 3,
      id: '60ab6d9953c7a923ddb290ed',
      role: 2,
    }),
  );
  expect(screen.queryByText('+')).toBeInTheDocument();
});

it('changing filters dispatches filter action', () => {
  customRender();

  const filterSelect = screen.getAllByText('Select...')[0];
  userEvent.click(filterSelect);
  const filterSelectButton = screen.getByText('Price: lowest first');
  expect(filterSelectButton).toBeInTheDocument();
  userEvent.click(filterSelectButton);
});
