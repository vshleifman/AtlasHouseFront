import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { userSelector } from 'selectors/selectors';
import { Btn } from 'styles/styles';
import { styled } from 'twin.macro';
import { BookingContext } from './BookingProvider';

const DescBlock = styled.div`
  grid-area: descblock;
  height: 20em;
  grid-template: 'desc amen' 3fr 'desc btn' 2fr / 1fr 1fr;
  place-items: stretch;
`;

const DescriptionBlock = () => {
  const { apartment, setIsOpen } = useContext(BookingContext);
  const user = useSelector(userSelector).userData;
  const history = useHistory();

  let amenities = Object.keys(apartment?.amenities ?? {});

  const onClick = () => {
    if (user?.role === 0) {
      alert('Please Sign In');
      return history.push('/auth');
    }
    setIsOpen(true);
  };

  return (
    <DescBlock className="base-unit">
      <div className="base-unit" tw="grid-area[desc]">
        {apartment?.description}
      </div>

      <div className="base-unit" tw="grid-area[amen]">
        {amenities?.map(entry => (
          <p key="entry" tw="capitalize">
            {entry}
          </p>
        ))}
      </div>

      <Btn className="base-unit" tw="grid-area[btn] w-22 place-self-center" onClick={onClick}>
        Book Apartment
      </Btn>
    </DescBlock>
  );
};

export default DescriptionBlock;
