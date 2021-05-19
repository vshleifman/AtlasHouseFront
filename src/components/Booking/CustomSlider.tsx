import Slider from 'react-slick';
import { styled } from 'twin.macro';
import rigaPan from 'images/Riga_panorama.jpg';
import balda from 'images/baldaquin1.jpeg';

const Carousel = styled.div`
  grid-area: carousel;
  place-items: initial;
  border: 1px solid black;
  background: rgba(0, 0, 0, 0.712);

  .slick-slider {
    display: grid;
    width: 100vw;
  }

  .slick-dots {
    align-self: end;
    position: relative;
    bottom: 1rem;
  }
`;

const TestDiv = styled.div`
  background-image: url('${balda}');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 20em;
  max-height: 20em;
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

const CustomSlider = () => {
  return (
    <Carousel>
      <Slider
        dots={true}
        // customPaging={i => {
        //   return (
        //     <a>
        //       <div tw="border border-dark-gray rounded-full h-1 w-1 bg-white active:opacity-60 visited:opacity-60"></div>
        //     </a>
        //   );
        // }}
        // dotsClass="slick-dots slick-thumb"
        nextArrow={<CustomNextArrow />}
        prevArrow={<CustomPrevArrow />}
      >
        <TestDiv />
        <div>2</div>
        <div>3</div>
      </Slider>
    </Carousel>
  );
};

export default CustomSlider;
