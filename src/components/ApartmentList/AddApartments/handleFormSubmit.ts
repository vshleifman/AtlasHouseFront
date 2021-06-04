import api from 'api/axiosInstance';
import { FormikContextType } from 'formik';
import { Dispatch } from 'react';
import { Apartment } from 'types/types';
import { setPropertiesThunk } from '../PropertyThunks';

const handleFormSubmit = async (
  dispatch: Dispatch<any>,
  formik: FormikContextType<unknown>,
  values: {
    name: string;
    description: string;
    codeID: string;
    price: number | undefined;
  },
  acceptedFiles: File[],
  apartment?: Apartment,
) => {
  const formData = new FormData();

  for (let key in values) {
    const value = values[key as keyof typeof values];

    if (value) formData.append(key, value.toString());
  }

  acceptedFiles.forEach(file => {
    formData.append('pictures', file);
  });

  const headers = {
    'Content-Type': 'multipart/form-data',
  };

  try {
    if (apartment) {
      await api.patch(`/properties/${apartment.id}`, formData, { headers });
      dispatch(setPropertiesThunk());
    } else {
      await api.post('/properties', formData, { headers });
    }

    alert(apartment ? 'Updated!' : 'Added!');
    if (!apartment) formik.resetForm();
  } catch (error) {
    console.log(error);
  }
};

export default handleFormSubmit;
