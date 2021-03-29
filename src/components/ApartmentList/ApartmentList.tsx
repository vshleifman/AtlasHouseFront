import styled from "styled-components";
import { Apartment } from "types/types";
import ApartmentListing from "./ApartmentListing";

const ApartmentList = ({
  className,
  apartments,
}: {
  className?: any;
  apartments: Apartment[];
}) => {
  return (
    <div className={className}>
      {apartments[0].name
        ? apartments.map((apartment) => (
            <ApartmentListing key={Math.random()} apartment={apartment} />
          ))
        : null}
    </div>
  );
};

export default ApartmentList;
