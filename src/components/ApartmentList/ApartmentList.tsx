import { RefObject } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { Apartment } from 'types/types';
import ApartmentListing from './ApartmentListing';

const Container = styled.div`
  grid-area: list;
  margin-top: 2em;
`;

const StLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
const ApartmentList = ({
  reference,
  apartments,
}: {
  reference?: RefObject<HTMLDivElement>;
  apartments: Apartment[] | undefined;
}) => {
  const { path } = useRouteMatch();

  return (
    <Container data-testid="list" ref={reference}>
      {apartments
        ? apartments.map(apartment => (
            <StLink key={apartment.codeID} to={`${path}/${apartment.codeID}`}>
              <ApartmentListing apartment={apartment} />
            </StLink>
          ))
        : null}
    </Container>
  );
};

export default ApartmentList;
