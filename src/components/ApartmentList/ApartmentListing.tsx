import moment from "moment";
import { useContext } from "react";
import styled from "styled-components";
import { Apartment } from "types/types";
import { FilterContext } from "./Apartments";

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
  const isAvailable = (dateRange: { from: string; to: string }) => {
    const initialRange = {
      from: moment().subtract(5, "h").toISOString(),
      to: moment().add(1, "d").toISOString(),
    };
    if (dateRange.from === "") {
      dateRange = initialRange;
    }

    const bool = apartment.bookings.every(
      (booking) =>
        moment(booking.checkIn).toISOString() >=
          moment(dateRange.to).toISOString() ||
        moment(booking.checkOut).toISOString() <=
          moment(dateRange.from).toISOString()
    );
    return bool;
  };
  const { filters } = useContext(FilterContext);
  return (
    <Container data-testid="listing">
      <Photo></Photo>
      <Name>{apartment.name}</Name>
      <Availability>
        {isAvailable(filters.dateRange) ? "Available" : "Not Available"}
      </Availability>
      <Description>a room</Description>
      <Price>{apartment.price}</Price>
    </Container>
  );
};

export default ApartmentListing;
