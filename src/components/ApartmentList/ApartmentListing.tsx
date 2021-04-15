import moment from "moment";
import { useContext } from "react";
import styled from "styled-components";
import { Apartment } from "types/types";
import { FilterContext } from "./FilterProvider";

const Container = styled.div`
  display: grid;
  grid-template: "photo name name" 1fr "photo description price" 1fr "photo description price" 1fr / 2fr 3fr 1fr;
  margin: 5px;
  border-top: 2px orange dotted;
  border-bottom: 2px orange dotted;
  padding: 1em 0 1em 0;
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
const Description = styled(BaseBox)`
  grid-area: description;
`;
const Price = styled(BaseBox)`
  grid-area: price;
`;

const ApartmentListing = ({ apartment }: { apartment: Apartment }) => {
  const isAvailable = (dateRange: {
    from: string | undefined;
    to: string | undefined;
  }) => {
    const initialRange = {
      from: moment().hour(12).toISOString(),
      to: moment().hour(14).add(1, "d").toISOString(),
    };

    if (dateRange.from === undefined) {
      dateRange = initialRange;
    }

    console.log(dateRange);

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
      <Description>a room</Description>
      <Price>{apartment.price}</Price>
    </Container>
  );
};

export default ApartmentListing;
