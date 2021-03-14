import { useEffect, useLayoutEffect } from "react";
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

  return (
    <div>
      {propertiesData.properties[0].name
        ? propertiesData.properties.map((property) => (
            <ApartmentListing key={property.name} apartment={property} />
          ))
        : null}
    </div>
  );
};

export default ApartmentList;
