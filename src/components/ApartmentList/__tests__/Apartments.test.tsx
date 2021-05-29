import { generateApartment, render, screen, waitFor } from 'testUtils';
import userEvent from '@testing-library/user-event';
import api from 'api/axiosInstance';
import moment from 'moment';
import Apartments from '../Apartments';
import * as slice from '../PropertySlice';

const customRender = () => render(<Apartments />);

const aprtmGenerationArr = [
  { checkIn: moment().date(15), checkOut: moment().date(16), name: 'InRange' },
  {
    checkIn: moment().date(13),
    checkOut: moment().date(14),
    name: 'BeforeRange',
  },
  {
    checkIn: moment().date(17),
    checkOut: moment().date(18),
    name: 'AfterRange',
  },
  {
    checkIn: moment().date(14),
    checkOut: moment().date(16),
    name: 'IntoRange',
  },
  {
    checkIn: moment().date(15),
    checkOut: moment().date(17),
    name: 'FromRange',
  },
  {
    checkIn: moment().date(14),
    checkOut: moment().date(17),
    name: 'AroundRange',
  },
];

let apartments = aprtmGenerationArr.map(element =>
  generateApartment(moment(element.checkIn).toISOString(), moment(element.checkOut).toISOString(), element.name),
);

const clickDate = (date: string) => userEvent.click(screen.getAllByText(date)[0]);

it('displays a correct selection of apartments by date', async () => {
  jest.spyOn(api, 'get').mockResolvedValueOnce({
    data: apartments,
  });
  // window.HTMLElement.prototype.scrollIntoView = () => {};

  // const propSpy = jest.spyOn(slice, 'setProperties');
  customRender();

  // await screen.findByText('InRange');
  // screen.getByText('BeforeRange');
  // screen.getByText('AfterRange');
  // screen.getByText('IntoRange');
  // screen.getByText('FromRange');
  // screen.getByText('AroundRange');

  // await waitFor(() => expect(propSpy).toHaveBeenCalledWith(apartments));
});
