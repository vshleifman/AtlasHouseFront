import moment from "moment";
import styled from "styled-components";
import { Apartment } from "types/types";

const Container = styled.div`
  border: 1px solid black;
  border-radius: 25px;
  display: grid;
  grid-template: "photo name availability" 1fr "photo description availability" 1fr "photo description price" 1fr / 2fr 3fr 1fr;
  margin: 5px;
`;

const BaseBox = styled.div`
  border: 1px solid black;
  display: grid;

  place-items: center;
  margin: 10px;
`;

const Photo = styled(BaseBox)`
  grid-area: photo;
  height: 180px;
`;
const Name = styled(BaseBox)`
  grid-area: name;
`;
const Availability = styled(BaseBox)`
  grid-area: availability;
`;
const Description = styled(BaseBox)`
  grid-area: description;
`;
const Price = styled(BaseBox)`
  grid-area: price;
`;

const ApartmentListing = ({ apartment }: { apartment: Apartment }) => {
  const isAvailable = () => {
    const bool = apartment.bookings.some(
      (booking) =>
        moment(booking.checkIn).toDate() <= moment().toDate() &&
        moment(booking.checkOut).toDate() >= moment().toDate()
    );
    return !bool;
  };
  return (
    <Container data-testid="listing">
      <Photo></Photo>
      <Name>{apartment.name}</Name>
      <Availability>
        {isAvailable() ? "Available Now" : "Not Currently Available"}
      </Availability>
      <Description>a room</Description>
      <Price>{apartment.price}</Price>
    </Container>
  );
};

export default ApartmentListing;
