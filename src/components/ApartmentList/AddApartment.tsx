import api from 'api/axiosInstance';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Dropzone from 'react-dropzone';
import { Btn, Heading } from 'styles/styles';
import tw, { styled } from 'twin.macro';
import * as Yup from 'yup';

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

  return (
    <Container>
      <Heading tw="flex[10rem]">Add A New Apartment</Heading>
      <Formik
        initialValues={{
          name: '',
          description: '',
          mainPhoto: undefined,
          otherPhotos: undefined,
          codeID: '',
          price: '',
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
          codeID: Yup.string().required('Required'),
        })}
        onSubmit={(values, { resetForm }) => {
          try {
            api.post('/properties', values);
            alert('Added!');
            resetForm();
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
            add apartment
          </Btn>
        </Form>
      </Formik>
    </Container>
  );
};

export default AddApartment;
