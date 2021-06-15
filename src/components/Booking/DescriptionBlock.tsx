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
    ${tw`flex flex-col items-stretch grid-area[descblock]`}
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
      <div tw="flex justify-end">
        <section tw="flex flex-col flex-grow items-center p-3 bg-gradient-to-l to-white from-light-gray">
          <h1 tw="justify-center w-20 pb-1 flex border-b border-secondary">Description</h1>
          <div tw="flex justify-between place-self-stretch p-2">
            <div tw="min-width[fit-content] mt-2 mr-4">
              <p>
                Area: {apartment.area} m<sup>2</sup>
              </p>
              <p>Price: {apartment.price} €</p>
            </div>
            <p tw="place-self-start mt-2">{apartment.description}</p>
          </div>
        </section>

        <section tw="flex flex-col items-center p-3 bg-gradient-to-r from-light-gray to-white">
          <h1 tw="justify-center w-20 pb-1 flex border-b border-secondary">Amenities</h1>

          <div className="ams" tw="flex flex-col flex-wrap self-stretch">
            {amenities?.map(entry => {
              if (apartment.amenities[entry as keyof amenitiesList] === true) {
                return (
                  <p key={entry} tw="capitalize place-self-start mx-1 my-0.5">
                    <IconsSwitch amenity={entry as keyof amenitiesList} /> {entry}
                  </p>
                );
              }
            })}
          </div>
        </section>
      </div>

      <section tw="flex">
        <Btn type="button" onClick={() => history.goBack()}>
          Return
        </Btn>
        <Btn tw="" onClick={onClick}>
          Book Apartment
        </Btn>
      </section>
    </Container>
  );
};

export default DescriptionBlock;
