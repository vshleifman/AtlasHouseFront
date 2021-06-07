import { Btn, Heading } from 'styles/styles';
import ModalCloseButton from './ModalCloseButton';
import Section from './Section';

const InvoiceModal = ({ setIsOpen }: { setIsOpen: (arg: boolean) => void }) => {
  return (
    <>
      <ModalCloseButton />
      <div tw="flex flex-col font-family['Playfair Display'] text-2xl">
        <Heading tw="text-4xl self-center">Check the Booking Details</Heading>
        <Section title="Booking Details" content={<div>invoice</div>} />

        <hr tw="text-secondary m-3" />

        <Section title="Payment Details" content={<div>payment</div>} />
        <section tw="self-center mt-4">
          <Btn
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Return
          </Btn>
          <Btn onClick={() => {}}>Generate Invoice</Btn>
        </section>
      </div>
    </>
  );
};

export default InvoiceModal;
