import { createContext, useState } from 'react';
import { Apartment } from 'types/types';

export const BookingContext = createContext<{
  apartment?: Apartment;
  setApartment: (apartment: Apartment) => void;
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
}>({
  apartment: undefined,
  setApartment: () => {},
  isOpen: false,
  setIsOpen: () => {},
});

const BookingProvider = ({ children }: { children?: JSX.Element[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [apartment, setApartment] = useState({} as Apartment);

  return (
    <BookingContext.Provider value={{ apartment, setApartment, isOpen, setIsOpen }}>{children}</BookingContext.Provider>
  );
};

export default BookingProvider;
