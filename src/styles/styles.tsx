import styled from 'styled-components';
import tw from 'twin.macro';

export const Btn = styled.button`
  ${tw`h-10 p-0.5 m-1 w-22 uppercase border border-solid flex-grow`}
  &:hover {
    ${tw`bg-hover border-secondary text-white transition-all duration-200`}
  }
`;

export const Heading = styled.h3`
  ${tw`text-6xl my-4`};

  font-weight: 100;
  grid-area: head;
`;
