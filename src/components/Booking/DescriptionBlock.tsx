import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { userSelector } from 'selectors/selectors';
import { Btn } from 'styles/styles';
import { amenitiesList } from 'types/types';
import { BookingContext } from './BookingProvider';
import IconsSwitch from './IconsSwitch';
import tw, { styled } from 'twin.macro';

const DescriptionBlock = () => {
  const { apartment, setIsOpen } = useContext(BookingContext);
  const user = useSelector(userSelector).userData;
  const history = useHistory();

  let amenities = Object.keys(apartment?.amenities ?? {});

  const maxHeight = amenities.length > 4 ? `${3.5 * (amenities.length / 2)}rem` : 'initial';
  const Container = styled.div`
    ${tw`flex justify-center items-stretch grid-area[descblock]`}
    svg {
      color: gray;
    }
    .ams {
      max-height: ${maxHeight};
    }
  `;

  const onClick = () => {
    if (user?.role === 0) {
      alert('Please Sign In');
      return history.push('/auth');
    }
    setIsOpen(true);
  };

  return (
    <Container>
      <section tw="flex flex-col items-center p-3 bg-gradient-to-l to-white from-light-gray">
        <h1 tw="justify-center w-20 pb-1 flex border-b border-secondary">Description</h1>
        <p tw="place-self-start mt-2">{apartment.description}</p>
      </section>
      <div tw="flex flex-col bg-gradient-to-r from-light-gray to-white">
        <section tw="flex flex-col items-center p-3">
          <h1 tw="justify-center w-20 pb-1 flex border-b border-secondary">Amenities</h1>
          <div className="ams" tw="flex flex-col flex-wrap self-stretch">
            {amenities?.map(entry => (
              <p key="entry" tw="capitalize place-self-start mx-1 my-0.5">
                <IconsSwitch amenity={entry as keyof amenitiesList} /> {entry}
              </p>
            ))}
          </div>
        </section>

        <section>
          <Btn tw="" onClick={onClick}>
            Book Apartment
          </Btn>
        </section>
      </div>
    </Container>
  );
};

export default DescriptionBlock;
