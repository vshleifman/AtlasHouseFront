import { ErrorMessage, Field, Form, Formik, useFormikContext } from 'formik';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { propertySelector } from 'selectors/selectors';
import { Btn, Heading } from 'styles/styles';
import tw, { styled } from 'twin.macro';
import * as Yup from 'yup';
import formFields from './apartmentFormFields';
import PicInput from './PicInput';
import handleFormSubmit from './handleFormSubmit';
import { useCallback, useState } from 'react';

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

  const location = useLocation();
  const apartmentCode = location.pathname.replace('/add_apartment/', '');
  const apartment = useSelector(propertySelector).properties?.find(apartm => apartm.codeID === apartmentCode);
  const dispatch = useDispatch();
  const formik = useFormikContext();

  const initialPicState = apartment?.pictures
    ? [{ picture: '', name: '' }].concat(
        apartment?.pictures.map(pic => {
          return { picture: pic, name: '' };
        }),
      )
    : [{ picture: '', name: '' }];

  const [picturesState, setPicturesState] = useState(initialPicState);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      let newPicState: any = picturesState;
      acceptedFiles.forEach(async file => {
        console.log(file);
        let binary = '';
        const bytes = new Uint8Array(await file.arrayBuffer());
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        newPicState = [...newPicState, { picture: window.btoa(binary), name: file.name }];
        setPicturesState(newPicState);
      });
    },
    [picturesState],
  );

  const dropzone = useDropzone({ onDrop });

  const picArray: JSX.Element[] = [];

  for (let i = 0; i < picturesState.length; i++) {
    picArray.push(
      <PicInput
        key={i}
        dropzone={dropzone}
        picturesState={picturesState}
        setter={setPicturesState}
        pictureData={picturesState[i]}
      />,
    );
  }

  const initialValues = {
    name: apartment ? apartment.name : '',
    description: apartment ? apartment.description : '',
    codeID: apartment ? apartment.codeID : '',
    price: apartment ? apartment.price : undefined,
  };

  return (
    <Container>
      <Heading tw="flex[10rem] ">Add A New Apartment</Heading>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
          codeID: Yup.string().required('Required'),
        })}
        onSubmit={values => handleFormSubmit(dispatch, formik, values, dropzone.acceptedFiles, apartment)}
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
