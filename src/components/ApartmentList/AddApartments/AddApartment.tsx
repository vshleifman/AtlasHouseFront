import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { propertySelector } from 'selectors/selectors';
import { Btn, Heading } from 'styles/styles';
import tw, { styled } from 'twin.macro';
import * as Yup from 'yup';
import formFields from './apartmentFormFields';
import PicInput from './PicInput';
import handleFormSubmit from './handleFormSubmit';
import { useEffect, useState } from 'react';
import { amenitiesList } from 'types/types';
import SelectAmenities from './SelectAmenities';

const Container = styled.div`
  ${tw`flex flex-col items-center`}

  input,
  textarea {
    ${tw`custom-input`}
  }
  form > div {
    margin-top: 2rem;
  }
`;

const AddApartment = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const location = useLocation();
  const apartmentCode = location.pathname.replace('/add_apartment/', '');
  const apartment = useSelector(propertySelector).properties?.find(apartm => apartm.codeID === apartmentCode);

  const emptyPicFile = new File([''], '', { type: 'image/jpg' });

  const [picturesState, setPicturesState] = useState([emptyPicFile]);
  const [amenities, setAmenities] = useState<Partial<amenitiesList>>({});

  useEffect(() => {
    const initPicStateSetter = async () => {
      if (!apartment?.pictures) {
        return;
      }

      const initialPicState = await Promise.all(
        apartment.pictures.map(async pic => {
          const res = await fetch(`data:${pic.mimetype};base64, ${pic.buffer}`);
          const blob = await res.blob();
          return new File([blob], pic.name, {
            type: pic.mimetype,
          });
        }),
      );

      setPicturesState([...picturesState, ...initialPicState]);
    };

    initPicStateSetter();
  }, []);

  const picArray: JSX.Element[] = [];

  for (let i = 0; i < picturesState.length; i++) {
    picArray.push(
      <PicInput
        key={i}
        picturesState={picturesState}
        setPicturesState={setPicturesState}
        currentPictureFile={picturesState[i]}
      />,
    );
  }

  const initialFormikValues = {
    name: apartment ? apartment.name : '',
    description: apartment ? apartment.description : '',
    codeID: apartment ? apartment.codeID : '',
    price: apartment ? apartment.price : 0,
    area: apartment ? apartment.area : 0,
  };

  return (
    <Container>
      <Heading tw="flex[10rem] ">Add A New Apartment</Heading>
      <Formik
        initialValues={initialFormikValues}
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
          codeID: Yup.string().required('Required'),
        })}
        onSubmit={(values, { resetForm }) => {
          handleFormSubmit(dispatch, resetForm, values, amenities, picturesState, apartment);
        }}
      >
        <Form tw="flex flex-col justify-between">
          {formFields.map(field => (
            <div tw="flex flex-col" key={field.name}>
              <label htmlFor={field.name}>{field.text}</label>

              {field.type === 'textarea' ? (
                <Field name={field.name} placeholder={field.placeholder} as={field.type} />
              ) : (
                <Field name={field.name} placeholder={field.placeholder} type={field.type} />
              )}
              <ErrorMessage name={field.name} />
            </div>
          ))}

          <label tw="mt-3">Select amenities</label>
          <SelectAmenities onChange={amens => setAmenities(amens)} apartment={apartment} />

          <label tw="mt-3">Attach the photos</label>
          <div tw="flex gap-2 flex-wrap max-width[fit-content] pb-2">{picArray}</div>

          <div tw="flex place-self-stretch pt-1 border-t border-secondary border-dotted">
            <Btn type="button" onClick={() => history.goBack()}>
              Return
            </Btn>
            <Btn type="submit">{apartment ? 'update apartment' : 'add apartment'}</Btn>
          </div>
        </Form>
      </Formik>
    </Container>
  );
};

export default AddApartment;
