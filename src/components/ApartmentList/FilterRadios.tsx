import { Field } from "formik";
import { useContext } from "react";
import { FilterContext } from "./Apartments";

const FilterRadios = ({ amenity }: { amenity: string }) => {
  const { filters, setFilters } = useContext(FilterContext);

  const filterHandler = (e: any, amenity: string) => {
    setFilters({
      ...filters,
      amenities: {
        ...filters.amenities,
        [amenity]: e.target.value,
      },
    });
  };

  return (
    <label>
      <Field
        onBlur={(e: any) => filterHandler(e, amenity)}
        type="checkbox"
        name={amenity}
      />
      {amenity}
    </label>
  );
};

export default FilterRadios;
