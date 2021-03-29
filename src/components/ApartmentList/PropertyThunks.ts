import api from "api/axiosInstance";
import { AppThunk } from "store/store";
import { setProperties, addError } from "./PropertySlice";

export const setPropertiesThunk = (
  filters?: Record<string, boolean | Record<string, string>>
): AppThunk => async (dispatch) => {
  let queryString = `/properties`;

  if (filters) {
    let paramsString = `?`;
    Object.keys(filters).forEach((filter) => {
      if (filter === "dateRange") {
        paramsString = paramsString.concat(
          //@ts-ignore
          `${filter}=checkIn:${filters.dateRange.from};checkOut:${filters.dateRange.to}&`
        );
      } else {
        console.log(filters[filter]);

        if (filters[filter] === true) {
          paramsString = paramsString.concat(
            //@ts-ignore
            `${filter}=${filters[filter]}&`
          );
        }
      }
    });
    console.log({ paramsString });

    // queryString = `/properties`.concat(paramsString);
  }

  try {
    const response = await api.get(queryString);
    dispatch(setProperties(response.data));
  } catch (error) {
    dispatch(addError(error.message));
  }
};
