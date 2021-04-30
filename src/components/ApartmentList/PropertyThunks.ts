import api from 'api/axiosInstance';
import { AppThunk } from 'store/store';
import { FilterState } from './FilterProvider';
import { setProperties, addError } from './PropertySlice';

const cleanObject = (object: object) => {
  (Object.keys(object) as (keyof typeof object)[]).forEach(key => {
    const value = object[key];

    if (value === false) {
      delete object[key];
    }

    if (typeof value === 'object') {
      cleanObject(value);
    }

    if (typeof value === 'object' && Object.keys(value).length === 0) {
      delete object[key];
    }
  });
};

export const setPropertiesThunk = (
  filters?: FilterState,
): AppThunk => async dispatch => {
  const queryParams = { ...filters, amenities: { ...filters?.amenities } };

  cleanObject(queryParams);

  try {
    const response = await api.get('/properties', {
      params: queryParams,
    });
    dispatch(setProperties(response.data));
  } catch (error) {
    dispatch(addError(error.message));
  }
};
