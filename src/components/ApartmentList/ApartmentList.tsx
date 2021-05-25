import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { propertySelector } from 'selectors/selectors';
import ApartmentListing from './ApartmentListing';

const ApartmentList = () => {
  const reference = useRef<HTMLDivElement>(null);
  const apartments = useSelector(propertySelector).properties;

  return (
    <div tw="mt-2 self-stretch" data-testid="list" ref={reference}>
      {apartments ? (
        apartments.map(apartment => (
          <Link tw="no-underline color[black]" key={apartment.codeID} to={`apartments/${apartment.codeID}`}>
            <ApartmentListing key={apartment.codeID} apartment={apartment} />
          </Link>
        ))
      ) : (
        <h3 tw="py-4 text-3xl">No Properties Found</h3>
      )}
    </div>
  );
};

export default ApartmentList;
