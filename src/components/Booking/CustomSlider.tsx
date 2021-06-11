import Slider from 'react-slick';
import { styled } from 'twin.macro';

import arrow from 'images/sliderArrow.svg';

const Carousel = styled.div`
  grid-area: carousel;
  place-items: initial;
  background: rgba(146, 112, 37, 0.808);
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
    content: '';
  }
`;

const PrevArrow = styled.div`
  left: 25px;
  svg {
    transform: rotate(180deg);
  }
  z-index: 1;
  &::before {
    content: '';
  }
`;

const MySvg = () => (
  <svg tw="text-dark-gray text-2xl stroke-current" width="3em" height="3em" viewBox="0 0 100 100">
    <line x1="30" x2="70" y1="10" y2="51" stroke-width="6" />
    <line x1="70" x2="30" y1="49" y2="90" stroke-width="6" />
  </svg>
);

const CustomNextArrow = ({ className, style, onClick }: any) => {
  return (
    <NextArrow className={className} onClick={onClick}>
      <MySvg />
    </NextArrow>
  );
};

const CustomPrevArrow = ({ className, style, onClick }: any) => {
  return (
    <PrevArrow className={className} onClick={onClick}>
      <MySvg />
    </PrevArrow>
  );
};

const CustomSlider = ({ photos }: { photos?: { buffer: string; name: string; mimetype: string }[] }) => {
  return (
    <Carousel>
      {photos ? (
        <Slider
          dots={true}
          infinite={true}
          speed={10}
          centerPadding="60px"
          autoplay={true}
          pauseOnHover={true}
          slidesToScroll={1}
          className="center"
          centerMode={true}
          dotsClass="slick-dots slick-thumb"
          nextArrow={<CustomNextArrow />}
          prevArrow={<CustomPrevArrow />}
        >
          {photos?.map(photo => (
            <PhotoContainer key={photo.name}>
              <div>
                <img tw="h-30" src={`data:${photo.mimetype};base64, ${photo.buffer}`} alt="" />
              </div>
            </PhotoContainer>
          ))}
        </Slider>
      ) : null}
    </Carousel>
  );
};

export default CustomSlider;
