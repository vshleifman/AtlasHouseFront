import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBookingsThunk } from 'components/Booking/BookingThunks';
import styled from 'styled-components';
import { Apartment } from 'types/types';

const Container = styled.div`
  display: grid;
  grid-template: 'photo name name' 1fr 'photo description price' 1fr 'photo description price' 1fr / 2fr 3fr 1fr;
  margin: 5px;
  border-top: 2px orange solid;
  border-bottom: 2px transparent dotted;
  border-left: 2px solid transparent;
  border-right: 2px solid transparent;
  padding: 1em 0 1em 0;
  &:hover {
    background-color: rgba(13, 15, 146, 0.452);
    border: 2px orange solid;
    transition: background-color 0.2s, border 0.2s;
  }
`;

const BaseBox = styled.div`
  /* border: 1px solid black; */
  display: grid;

  place-items: center;
  margin: 10px;
`;

const Photo = styled(BaseBox)`
  grid-area: photo;
`;
const Name = styled(BaseBox)`
  grid-area: name;
`;
const Description = styled(BaseBox)`
  grid-area: description;
`;
const Price = styled(BaseBox)`
  grid-area: price;
`;

const ApartmentListing = ({ apartment }: { apartment: Apartment }) => {
  const dispatch = useDispatch();
  const pic = apartment?.pictures[0];

  useEffect(() => {
    dispatch(setBookingsThunk());
  }, [dispatch]);
  return (
    <Container data-testid="listing">
      <Photo>
        <img
          tw="max-h-20"
          src={
            pic
              ? `data:${pic?.mimetype};base64, ${pic?.buffer}`
              : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
          }
          alt=""
        />
      </Photo>
      <Name tw="place-self-center justify-center w-20 pb-1 flex border-b border-secondary">
        <p tw="flex justify-center text-4xl ">{apartment.name}</p>
      </Name>
      <Description tw="justify-start max-w-40">
        <p>{apartment.description || 'No description yet'}</p>
      </Description>
      <Price>{apartment.price} €</Price>
    </Container>
  );
};

export default ApartmentListing;
