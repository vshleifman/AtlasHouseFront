import api from 'api/axiosInstance';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Dropzone from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { propertySelector } from 'selectors/selectors';
import { Btn, Heading } from 'styles/styles';
import tw, { styled } from 'twin.macro';
import * as Yup from 'yup';
import { setPropertiesThunk } from './PropertyThunks';

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
  const formFields = [
    {
      name: 'name',
      text: 'Select the apartment name:',
      placeholder: 'Name',
      type: 'text',
    },
    {
      name: 'codeID',
      text: 'Select the apartment code:',
      placeholder: 'Number',
      type: 'text',
    },
    {
      name: 'price',
      text: 'Select the apartment price:',
      placeholder: 'Price',
      type: 'number',
    },
    {
      name: 'description',
      text: 'Write the apartments description:',
      placeholder: 'Description',
      type: 'textarea',
    },
  ];
  const dispatch = useDispatch();
  const location = useLocation();
  const apartmentCode = location.pathname.replace('/add_apartment/', '');

  const apartment = useSelector(propertySelector).properties?.find(apartm => apartm.codeID === apartmentCode);

  const initialValues = {
    name: apartment ? apartment.name : '',
    description: apartment ? apartment.description : '',
    mainPhoto: undefined,
    otherPhotos: apartment ? apartment.pictures : undefined,
    codeID: apartment ? apartment.codeID : '',
    price: apartment ? apartment.price : '',
  };

  return (
    <Container>
      <Heading tw="flex[10rem]">Add A New Apartment</Heading>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
          codeID: Yup.string().required('Required'),
        })}
        onSubmit={async (values, { resetForm }) => {
          try {
            if (apartment) {
              await api.patch(`/properties/${apartment.id}`, values);
              dispatch(setPropertiesThunk());
            } else {
              await api.post('/properties', values);
            }
            alert(apartment ? 'Updated!' : 'Added!');
            if (!apartment) resetForm();
          } catch (error) {}
        }}
      >
        <Form tw="flex flex-col justify-between" encType="multipart/form-data">
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

          <div tw="border-b border-secondary border-dotted">
            <label>Attach the photos</label>
            <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <div
                  tw="h-20 w-15 my-4 border-2 border-solid border-secondary bg-thinPlusSvg 
                  bg-primary bg-center bg-no-repeat transition-all duration-200 
                  hover:bg-thickPlusSvg hover:bg-hover hover:bg-center hover:bg-no-repeat"
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                </div>
              )}
            </Dropzone>
            {/* <p>Upload the main photo: </p>
              <StLabel htmlFor="mainPhoto"></StLabel>

              <StField id="mainPhoto" name="mainPhoto" type="file" />
              <ErrorMessage name="mainPhoto" /> */}
          </div>

          <Btn tw="place-self-center w-22" type="submit">
            {apartment ? 'update apartment' : 'add apartment'}
          </Btn>
        </Form>
      </Formik>
    </Container>
  );
};

export default AddApartment;
