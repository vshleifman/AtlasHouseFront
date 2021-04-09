import { useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Btn } from "styles/styles";

const Container = styled.div`
  display: grid;
  grid-template: ". wlcmText ." 1fr " . . . " 1fr "aprtm . down" 1fr / 1fr 1fr 1fr;
  padding-top: 30vh;
  grid-area: welcome;
`;

const WlcmText = styled.p`
  grid-area: wlcmText;
  place-self: center;
  font-size: 190%;
  color: white;
`;

const AprtmBtn = styled(Btn)`
  background-color: white;
  color: black;
  text-decoration: none;
`;

const StLink = styled(Link)`
  color: inherit;
  justify-self: end;
  grid-area: aprtm;
`;

const DownBtn = styled(Btn)`
  justify-self: start;
  grid-area: down;
  background-color: rgba(129, 119, 119, 0.89);
`;

const Welcome = ({
  reference,
}: {
  reference: React.MutableRefObject<null>;
}) => {
  return (
    <Container>
      <WlcmText>Welcome to Riga</WlcmText>
      <StLink to="/apartments">
        <AprtmBtn>View Apartments</AprtmBtn>
      </StLink>
      <DownBtn
        onClick={() => {
          //@ts-ignore
          reference.current.scrollIntoView();
        }}
      >
        About Us
      </DownBtn>
    </Container>
  );
};

export default Welcome;
