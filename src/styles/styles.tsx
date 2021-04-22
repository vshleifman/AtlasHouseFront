import styled from "styled-components";

export const Btn = styled.button`
  font-family: inherit;
  font-size: inherit;
  border: 1px black solid;
  height: 5.5em;
  width: 13.5em;
  padding: 0.5em;
  margin: 1em;
  text-transform: uppercase;
  &:hover {
    border-color: orange;
    background-color: rgba(59, 127, 204, 0.815);
    transition: border-color 0.2s, background-color 0.2s;
  }
`;

export const Heading = styled.h3`
  font-size: 2em;
  grid-area: head;
`;
