import styled from 'styled-components';
import { Btn, Heading } from 'styles/styles';
import Slider from 'react-slick';
import rigaPan from 'images/Riga_panorama.jpg';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { propertySelector } from 'selectors/selectors';
import ReactModal from 'react-modal';
import { useState } from 'react';

const Container = styled.div`
  display: grid;
  grid-template: '. head .' 1fr 'carousel carousel carousel' 3fr '. descblock .' auto / 1fr 3fr 1fr;
  place-items: stretch;
  width: 100vw;
`;
const BaseUnit = styled.div`
  display: grid;
  place-items: center;
`;
const Carousel = styled(BaseUnit)`
  grid-area: carousel;
  place-items: initial;
  border: 1px solid black;
  background: rgba(0, 0, 0, 0.863);
  color: brown;
  width: 100vw;
  height: 20em;

  .slick-slider {
    display: grid;
    width: 100vw;
  }
  .slick-prev {
    left: 25px;
  }

  .slick-next {
    right: 25px;
  }

  .slick-dots {
    align-self: end;
    position: relative;
    bottom: 3em;
  }
`;

const DescBlock = styled(BaseUnit)`
  grid-area: descblock;
  height: 20em;
  grid-template: 'desc amen' 3fr 'desc btn' 2fr / 1fr 1fr;
  place-items: stretch;
`;
const Description = styled(BaseUnit)`
  grid-area: desc;
`;
const Amenities = styled(BaseUnit)`
  grid-area: amen;
`;
const BookBtn = styled(Btn)`
  grid-area: btn;
  place-self: center;
`;

const TestDiv = styled.div`
  background-image: url('${rigaPan}');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 20em;
  max-height: 20em;
`;

const CustomNextArrow = ({ className, to, onClick }: any) => (
  <button type="button" onClick={onClick} className={`button button--text button--icon ${className}`} aria-label={to}>
    <div className="icon">a</div>
  </button>
);

const ApartmentPage = () => {
  const location = useLocation();
  const apartmentCode = location.pathname.replace('/apartments/', '');
  const apartment = useSelector(propertySelector).properties?.find(apartm => apartm.codeID === apartmentCode);

  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => {
    setIsOpen(true);
  };

  return (
    <Container>
      <Heading tw="place-self-center">{apartment?.name}</Heading>
      <Carousel>
        <Slider dots={true} nextArrow={<CustomNextArrow />}>
          <TestDiv />
          <div>2</div>
          <div>3</div>
        </Slider>
      </Carousel>
      <ReactModal isOpen={isOpen}>
        <div>hihi</div>
      </ReactModal>

      <DescBlock>
        <Description>{apartment?.description}</Description>
        <Amenities>Amenities</Amenities>
        <BookBtn onClick={onClick} tw="w-22">
          Book Apartment
        </BookBtn>
      </DescBlock>
    </Container>
  );
};

export default ApartmentPage;
