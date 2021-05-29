import { useContext } from 'react';
import { BookingContext } from './BookingProvider';

const ModalCloseButton = () => {
  const { setIsOpen } = useContext(BookingContext);
  return (
    <div tw="flex flex-col">
      <button tw="self-end mb-2" onClick={() => setIsOpen(false)}>
        <svg
          tw="hover:transform hover:scale-110 transition-all duration-75"
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          fill-rule="evenodd"
          clip-rule="evenodd"
        >
          <path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" />
        </svg>
      </button>
    </div>
  );
};

export default ModalCloseButton;
