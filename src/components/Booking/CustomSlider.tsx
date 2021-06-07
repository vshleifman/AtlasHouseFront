import Slider from 'react-slick';
import { styled } from 'twin.macro';
import { PictureFile } from 'types/types';

const Carousel = styled.div`
  grid-area: carousel;
  place-items: initial;
  border: 1px solid black;
  background: rgba(0, 0, 0, 0.712);
`;

const PhotoContainer = styled.div`
  display: flex !important;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 35rem;
  padding: 0 8rem;
`;

const NextArrow = styled.div`
  right: 25px;
  &::before {
    font-size: 2rem;
    content: '>';
  }
`;

const PrevArrow = styled.div`
  left: 25px;
  z-index: 1;
  &::before {
    font-size: 2rem;
    content: '<';
  }
`;

const CustomNextArrow = ({ className, style, onClick }: any) => {
  return <NextArrow className={className} onClick={onClick} />;
};

const CustomPrevArrow = ({ className, style, onClick }: any) => {
  return <PrevArrow className={className} onClick={onClick} />;
};

const CustomSlider = ({ photos }: { photos?: PictureFile[] }) => {
  return (
    <Carousel>
      <Slider
        dots={true}
        infinite={true}
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        dotsClass="slick-dots slick-thumb"
        nextArrow={<CustomNextArrow />}
        prevArrow={<CustomPrevArrow />}
      >
        {photos?.map(photo => (
          <PhotoContainer key={photo.size}>
            <div>
              <img tw="h-30" src={`data:${photo.mimetype};base64, ${photo.buffer}`} alt="" />
            </div>
          </PhotoContainer>
        ))}
      </Slider>
    </Carousel>
  );
};

export default CustomSlider;
