import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { propertySelector } from 'selectors/selectors';
import ApartmentListing from './ApartmentListing';
import NoApartments from './NoApartments';

const ApartmentList = () => {
  const reference = useRef<HTMLDivElement>(null);
  const apartments = useSelector(propertySelector).properties;

  return (
    <div tw="mt-2 self-stretch" data-testid="list" ref={reference}>
      {apartments?.length ? (
        apartments.map(apartment => (
          <Link tw="no-underline color[black]" key={apartment.codeID} to={`apartments/${apartment.codeID}`}>
            <ApartmentListing key={apartment.codeID} apartment={apartment} />
          </Link>
        ))
      ) : (
        <NoApartments />
      )}
    </div>
  );
};

export default ApartmentList;
