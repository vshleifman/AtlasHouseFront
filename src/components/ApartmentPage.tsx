import styled from 'styled-components';
import { Btn } from 'styles/styles';
import { Apartment } from 'types/types';
import Slider from 'react-slick';
import rigaPan from 'images/Riga_panorama.jpg';

const Container = styled.div`
  display: grid;
  grid-template: '. head .' 1fr 'carousel carousel carousel' 3fr '. descblock .' auto / 1fr 3fr 1fr;
  place-items: stretch;
  width: 100vw;
`;
const Heading = styled.h3`
  font-size: 2em;
  grid-area: head;
  font-weight: inherit;
  place-self: center;
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
    z-index: 200;
    color: yellow;
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
`;

const ApartmentPage = ({ apartment }: { apartment: Apartment }) => {
  console.log(apartment.codeID);

  return (
    <Container>
      <Heading>{apartment.name || 'banana'}</Heading>
      <Carousel>
        <Slider dots={true}>
          <TestDiv />
          <div>2</div>
          <div>3</div>
        </Slider>
      </Carousel>

      <DescBlock>
        <Description>{apartment.description}</Description>
        <Amenities>Amenities</Amenities>
        <BookBtn>Book Apartment</BookBtn>
      </DescBlock>
    </Container>
  );
};

export default ApartmentPage;
