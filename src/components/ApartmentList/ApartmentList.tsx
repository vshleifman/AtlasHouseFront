import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPropertiesThunk } from "reducers/PropertySlice";
import { propertySelector } from "selectors/selectors";
import ApartmentListing from "./ApartmentListing";

const ApartmentList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPropertiesThunk());
  }, [dispatch]);
  const propertiesData = useSelector(propertySelector);
  const apartments = [];
  return (
    <div>
      {propertiesData.properties.map((property) => (
        <ApartmentListing apartment={property} />
      ))}
    </div>
  );
};

export default ApartmentList;
