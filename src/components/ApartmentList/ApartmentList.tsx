import styled from "styled-components";
import { Apartment } from "types/types";
import ApartmentListing from "./ApartmentListing";

const Container = styled.div`
  grid-area: list;
  margin-top: 2em;
`;

const ApartmentList = ({
  reference,
  apartments,
}: {
  reference?: React.MutableRefObject<null>;
  apartments: Apartment[];
}) => {
  return (
    <Container ref={reference}>
      {apartments[0].name
        ? apartments.map((apartment) => (
            <ApartmentListing key={Math.random()} apartment={apartment} />
          ))
        : null}
    </Container>
  );
};

export default ApartmentList;
