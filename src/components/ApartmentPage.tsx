import styled from 'styled-components';
import { Btn } from 'styles/styles';
import { Apartment } from 'types/types';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

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
	border: 1px solid black;
	background: rgba(24, 13, 128, 0.548);
	color: brown;
`;

const StSlider = styled(Slider)`
	max-width: 90vw;
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

const sliderSettings = {
	dots: true,
	adaptiveHeight: true,
	variableWidth: false,
	centerMode: false,
	centerPadding: '0px',
};

const ApartmentPage = ({ apartment }: { apartment: Apartment }) => {
	console.log(apartment.codeID);

	return (
		<Container>
			<Heading>{apartment.name || 'banana'}</Heading>
			<Carousel>
				<StSlider {...sliderSettings}>
					<div
						style={{
							backgroundImage:
								'https://upload.wikimedia.org/wikipedia/commons/b/b8/Riga_panorama.jpg',
						}}
					></div>
					<div>2</div>
					<div>3</div>
				</StSlider>
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
