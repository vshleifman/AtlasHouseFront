import styled from 'styled-components';
import { Heading } from 'styles/styles';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { propertySelector, userSelector } from 'selectors/selectors';
import ReactModal from 'react-modal';
import { useContext, useEffect } from 'react';
import BookingModal from './BookingModal';
import tw from 'twin.macro';
import CustomSlider from './CustomSlider';
import { BookingContext } from './BookingProvider';
import DescriptionBlock from './DescriptionBlock';
import { Link } from 'react-router-dom';

const editIcon =
  'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDQ1IDQ1IiBoZWlnaHQ9IjQ1cHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA0NSA0NSIgd2lkdGg9IjQ1cHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnPjxyZWN0IGZpbGw9IiMyMzFGMjAiIGhlaWdodD0iMjMiIHRyYW5zZm9ybT0ibWF0cml4KC0wLjcwNzEgLTAuNzA3MiAwLjcwNzIgLTAuNzA3MSAzOC4yNjY2IDQ4LjYwMjkpIiB3aWR0aD0iMTEiIHg9IjIzLjciIHk9IjQuODc1Ii8+PHBhdGggZD0iTTQ0LjA4NywzLjY4NmwtMi40OTQtMi40OTRjLTEuMzc3LTEuMzc3LTMuNjEtMS4zNzctNC45ODcsMEwzNC44NTYsMi45NGw3Ljc3OCw3Ljc3OGwxLjc0OS0xLjc0OSAgIEM0NS43NjEsNy41OTMsNDUuNDY1LDUuMDYzLDQ0LjA4NywzLjY4NnoiIGZpbGw9IiMyMzFGMjAiLz48cG9seWdvbiBmaWxsPSIjMjMxRjIwIiBwb2ludHM9IjE2LDIyLjIyOSAxNiwzMCAyMy4yNDYsMzAgICIvPjxwYXRoIGQ9Ik0yOSw0MEg1VjE2aDEyLjU1NWw1LTVIMy41QzEuODQzLDExLDAsMTEuODQzLDAsMTMuNXYyOEMwLDQzLjE1NiwxLjg0Myw0NSwzLjUsNDVoMjggICBjMS42NTYsMCwyLjUtMS44NDQsMi41LTMuNVYyMy41OTZsLTUsNVY0MHoiIGZpbGw9IiMyMzFGMjAiLz48L2c+PC9zdmc+';
const Container = styled.div`
  display: grid;
  grid-template: '. head .' 1fr 'carousel carousel carousel' 3fr '. descblock .' auto / 1fr 3fr 1fr;
  place-items: stretch;
  width: 100vw;

  .base-unit {
    ${tw`grid place-items-center`}
  }
`;

const EditLink = styled(Link)`
  background-image: url(${editIcon});
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
    transition: transform 0.2s;
  }
`;

const ApartmentPage = () => {
  const location = useLocation();
  const apartmentCode = location.pathname.replace('/apartments/', '');

  const user = useSelector(userSelector).userData;

  const { isOpen, setApartment } = useContext(BookingContext);

  const apartment = useSelector(propertySelector).properties?.find(apartm => apartm.codeID === apartmentCode);

  useEffect(() => {
    setApartment(apartment!);
  }, []);

  return (
    <Container>
      <div tw="flex grid-area[head] items-center">
        <Heading tw="flex justify-center flex-grow place-self-center">{apartment?.name}</Heading>
        {user?.role === 2 ? (
          <EditLink to={`/add_apartment/${apartment?.codeID}`} tw="h-2 w-2 bg-no-repeat bg-cover"></EditLink>
        ) : null}
      </div>

      <CustomSlider />

      <ReactModal isOpen={isOpen} ariaHideApp={false}>
        <BookingModal />
      </ReactModal>

      <DescriptionBlock />
    </Container>
  );
};

export default ApartmentPage;
