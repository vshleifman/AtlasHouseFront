import { generateApartment, render, screen, waitFor } from 'testUtils';
import ApartmentList from '../ApartmentList';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import * as slice from '../PropertySlice';

const apartment1 = generateApartment();
const apartment2 = generateApartment(undefined, undefined, 'testApartment2');
const apartments = [apartment1, apartment2];

const customRender = () => render(<ApartmentList apartments={apartments} />);

test('renders listings from store', async () => {
  customRender();
  screen.getByText('testApartment');
  screen.getByText('testApartment2');
});
