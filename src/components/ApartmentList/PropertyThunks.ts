import api from "api/axiosInstance";
import { AppThunk } from "store/store";
import { FilterState } from "./Apartments";
import { setProperties, addError } from "./PropertySlice";

export const setPropertiesThunk = (filters?: FilterState): AppThunk => async (
  dispatch
) => {
  let queryString = `/properties`;

  if (filters) {
    let paramsString = `?`;
    if (filters.dateRange.from !== "") {
      paramsString = paramsString.concat(
        `dateRange=from_${filters.dateRange.from};to_${filters.dateRange.to}&`
      );
    }

    Object.keys(filters.amenities).forEach((amenity) => {
      //@ts-ignore
      if (filters.amenities[amenity] === true) {
        paramsString = paramsString.concat(
          // @ts-ignore
          `amenities=${amenity}:${filters.amenities[amenity]}&`
        );
      }
    });

    queryString = `/properties`.concat(paramsString);
    console.log({ queryString });
  }

  try {
    const response = await api.get(queryString);
    dispatch(setProperties(response.data));
  } catch (error) {
    dispatch(addError(error.message));
  }
};
