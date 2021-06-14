import api from 'api/axiosInstance';
import { Dispatch } from 'react';
import { amenitiesList, Apartment } from 'types/types';
import { setPropertiesThunk } from '../PropertyThunks';

const handleFormSubmit = async (
  dispatch: Dispatch<any>,
  resetForm: () => void,
  values: {
    name: string;
    description: string;
    codeID: string;
    price: number | undefined;
  },
  amenities: Partial<amenitiesList>,
  picturesState: File[],
  apartment?: Apartment,
) => {
  const formData = new FormData();

  for (let key in values) {
    const value = values[key as keyof typeof values];

    if (value) formData.append(key, value.toString());
  }
  const amenitiesString = JSON.stringify(amenities);

  formData.append('amenities', amenitiesString);

  picturesState.forEach(file => {
    formData.append('pictures', file);
  });

  const headers = {
    'Content-Type': 'multipart/form-data',
  };

  try {
    if (apartment) {
      await api.patch(`/properties/${apartment.id}`, formData, { headers });
    } else {
      await api.post('/properties', formData, { headers });
    }
    dispatch(setPropertiesThunk());

    alert(apartment ? 'Updated!' : 'Added!');
    if (!apartment) resetForm();
  } catch (error) {
    console.log(error);
  }
};

export default handleFormSubmit;
