import moment from 'moment';
import tw from 'twin.macro';
import { Apartment, Booking, User } from 'types/types';

const issuer = {
  name: 'Julia Seleznova',
  id: '070766-10510',
  address: '31A-35, Bullu iela, Riga, Latvia',
  tel: '+37125506309',
  fax: '+37167284650',
  regNum: 'LV07076610510',
  bank: 'Swedbank',
  IBAN: 'LV25HABA0551045283920',
  BIC: 'HABALV22',
};

const TableUnit = ({ title, children }: { title: string; children: JSX.Element[] | JSX.Element }) => {
  return (
    <div tw="flex flex-col items-stretch border flex-basis-25 min-height[25rem]">
      <div tw="text-white h-3 bg-dark-gray flex-center">{title}</div>
      <div tw="flex-grow[5] p-1 flex flex-col gap-1">{children}</div>
    </div>
  );
};

const InvoiceDetails = ({ booking }: { booking: Booking }) => {
  const monthsNo = moment(booking.checkOut).diff(moment(booking.checkIn), 'months');

  const totalPrice =
    monthsNo > 0
      ? `${(booking.property as Apartment).price * monthsNo} €`
      : `${(booking.property as Apartment).price} €`;

  return (
    <div tw="flex flex-col items-stretch w-11/12">
      <div tw="flex justify-between gap-1 mb-2">
        <TableUnit title="Invoice to:">
          <p tw="border-b">{`${(booking.user as User).firstName} ${(booking.user as User).lastName}`}</p>
        </TableUnit>
        <div>
          <TableUnit title="Issued by:">
            <p tw="border-b">{issuer.name}</p>
            <p tw="border-b">{issuer.id}</p>
            <p tw="border-b">Legal address: {issuer.address}</p>
            <p tw="border-b">Tel: {issuer.tel}</p>
            <p tw="border-b">Fax: {issuer.fax}</p>
          </TableUnit>
        </div>
        <div>
          <TableUnit title="Bank Account Details:">
            <p tw="border-b">Bank Account Holder: {issuer.name}</p>
            <p tw="border-b">Company registration number: {issuer.regNum}</p>
            <p tw="border-b">Bank name: {issuer.bank}</p>
            <p tw="border-b">IBAN: {issuer.IBAN}</p>
            <p tw="border-b">BIC: {issuer.BIC}</p>
            <p tw="border-b">Invoice No: </p>
          </TableUnit>
        </div>
      </div>

      <div tw="flex">
        <div tw="flex-grow[2]">
          <TableUnit title="Apatm. address">
            <p>{`Rīga, Lācpleša 18 - ${(booking.property as Apartment).codeID}`}</p>
          </TableUnit>
        </div>
        <div tw="flex-grow[3]">
          <TableUnit title="Description of service">
            <p>{`${moment(booking.checkIn).format('MMMM')} rent`}</p>
          </TableUnit>
        </div>
        <div tw="flex-grow[1]">
          <TableUnit title="No. of months">
            <p>{monthsNo}</p>
          </TableUnit>
        </div>
        <div tw="flex-grow[1]">
          <TableUnit title="Price per month">
            <p>{`${(booking.property as Apartment).price} €`}</p>
          </TableUnit>
        </div>
        <div tw="flex-grow[1]">
          <TableUnit title="Total">
            <p>{totalPrice}</p>
          </TableUnit>
        </div>
      </div>
      <div tw=" mt-3 gap-2 flex flex-col items-stretch">
        <div tw="flex justify-between">
          <p>Country: Latvia</p>
          <p>Currency: EUR</p>
          <p>Total Euro: {totalPrice}</p>
        </div>
        <div tw="flex justify-between">
          <p tw="flex-basis-60">
            We declare that the above information is true and correct to the best of our knowledge. For and on behalf of
            the above named person.
          </p>
        </div>
        <div tw="flex justify-between">
          <p>Signed: </p>
          <p>Position: Owner</p>
          <p>{issuer.name}</p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
