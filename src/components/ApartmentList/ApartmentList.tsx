import { RefObject } from "react";
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
  reference?: RefObject<HTMLDivElement>;
  apartments: Apartment[] | undefined;
}) => {
  return (
    <Container data-testid="list" ref={reference}>
      {apartments
        ? apartments.map((apartment) => (
            <ApartmentListing key={Math.random()} apartment={apartment} />
          ))
        : null}
    </Container>
  );
};

export default ApartmentList;
