import { useState } from 'react';
import { Btn, Heading } from 'styles/styles';
import { styled } from 'twin.macro';
import { Booking } from 'types/types';
import InvoiceDetails from './InvoiceDetails';
import ModalCloseButton from '../ModalCloseButton';

const InvoiceModal = ({ booking, setIsOpen }: { booking: Booking; setIsOpen: (arg: boolean) => void }) => {
  const [hidden, setHidden] = useState(false);

  return (
    <>
      <div hidden={hidden}>
        <ModalCloseButton setIsOpenProp={setIsOpen} />
      </div>
      <div tw="flex flex-col font-family['Playfair Display'] text-2xl">
        <Heading tw="text-4xl self-center">Invoice</Heading>
        <div tw="flex justify-center">
          <InvoiceDetails booking={booking} />
        </div>

        <hr tw="text-secondary m-3" />

        <section hidden={hidden} tw="self-center mt-4">
          <Btn
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Return
          </Btn>
          <Btn
            onClick={() => {
              setHidden(true);
              setTimeout(() => {
                window.print();
                setHidden(false);
              }, 0);
            }}
          >
            Generate Invoice
          </Btn>
        </section>
      </div>
    </>
  );
};

export default InvoiceModal;
