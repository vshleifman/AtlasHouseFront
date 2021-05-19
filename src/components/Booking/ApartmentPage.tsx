import styled from 'styled-components';
import { Heading } from 'styles/styles';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { propertySelector } from 'selectors/selectors';
import ReactModal from 'react-modal';
import { useContext, useEffect } from 'react';
import BookingModal from './BookingModal';
import tw from 'twin.macro';
import CustomSlider from './CustomSlider';
import { BookingContext } from './BookingProvider';
import DescriptionBlock from './DescriptionBlock';

const Container = styled.div`
  display: grid;
  grid-template: '. head .' 1fr 'carousel carousel carousel' 3fr '. descblock .' auto / 1fr 3fr 1fr;
  place-items: stretch;
  width: 100vw;

  .base-unit {
    ${tw`grid place-items-center`}
  }
`;

const ApartmentPage = () => {
  const location = useLocation();
  const apartmentCode = location.pathname.replace('/apartments/', '');

  const { isOpen, setApartment } = useContext(BookingContext);

  const apartment = useSelector(propertySelector).properties?.find(apartm => apartm.codeID === apartmentCode);

  useEffect(() => {
    setApartment(apartment!);
  }, []);

  return (
    <Container>
      <Heading tw="place-self-center">{apartment?.name}</Heading>

      <CustomSlider />

      <ReactModal isOpen={isOpen} ariaHideApp={false}>
        <BookingModal />
      </ReactModal>

      <DescriptionBlock />
    </Container>
  );
};

export default ApartmentPage;
