import { Apartment } from "types/types";
import ApartmentListing from "./ApartmentListing";

const ApartmentList = ({ apartments }: { apartments: Apartment[] }) => {
  return (
    <div>
      {apartments[0].name
        ? apartments.map((apart) => (
            <ApartmentListing key={Math.random()} apartment={apart} />
          ))
        : null}
    </div>
  );
};

export default ApartmentList;
