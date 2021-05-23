import { RefObject } from 'react';
import { Link } from 'react-router-dom';
import { Btn } from 'styles/styles';

const Welcome = ({ reference }: { reference: RefObject<HTMLDivElement> }) => {
  return (
    <div tw="padding-top[30vh] flex flex-col">
      <p tw="margin-bottom[8rem] self-center text-5xl text-white">Welcome to Riga</p>
      <div tw="flex justify-evenly mt-4">
        <Btn
          tw="bg-white no-underline flex-grow-0"
          onClick={() => {
            reference.current !== null ? reference.current.scrollIntoView() : console.log('null');
          }}
        >
          View Apartments
        </Btn>
        <Link tw="flex-grow-0" to="/about">
          <Btn tw="bg-light-gray opacity-60 hover:opacity-95">About Us</Btn>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
