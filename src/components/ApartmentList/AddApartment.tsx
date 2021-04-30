import api from 'api/axiosInstance';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Dropzone from 'react-dropzone';
import styled, { createGlobalStyle } from 'styled-components';
import { Btn, Heading } from 'styles/styles';

const GlobalStyle = createGlobalStyle`
  input, textarea {
    min-height: 3em;
    width: 60em;
    max-width: 100%;
    font-family: inherit;
    align-content: center;
    margin: 1em 0 1em 0;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template: 'head' 10em 'form' / auto;
  justify-items: center;
`;

const StForm = styled(Form)`
  grid-area: form;
  display: grid;
  grid-template-rows: 1fr 1fr auto auto;
`;

const StLabel = styled.div`
  border: 2px solid orange;
  margin: 1em 0 1em 0;
  width: 8em;
  height: 10em;
  background: rgba(65, 90, 233, 0.288);
  background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xMSAxMXYtMTFoMXYxMWgxMXYxaC0xMXYxMWgtMXYtMTFoLTExdi0xaDExeiIvPjwvc3ZnPg==');
  background-position: center;
  background-repeat: no-repeat;
  transition: background-color 0.2s, background-image 0.2s;

  &:hover {
    background: rgba(21, 34, 107, 0.788);
    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTMgMnY5aDl2MmgtOXY5aC0ydi05aC05di0yaDl2LTloMnptMi0yaC02djloLTl2Nmg5djloNnYtOWg5di02aC05di05eiIvPjwvc3ZnPg==');
    background-position: center;
    background-repeat: no-repeat;
    transition: background-color 0.2s, background-image 0.2s;
  }
`;

const StPhotoInput = styled.div`
  border-bottom: 1px orange dotted;
`;

const StFormSection = styled.div`
  display: grid;
  grid-template-rows: 1fr auto 1fr;
`;

const StBtn = styled(Btn)`
  place-self: center;
`;

const AddApartment = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Heading>Add A New Apartment</Heading>
        <Formik
          initialValues={{
            name: '',
            description: '',
            mainPhoto: undefined,
            otherPhotos: undefined,
            codeID: '',
            price: '',
          }}
          onSubmit={(values, { resetForm }) => {
            try {
              api.post('/properties', values);
              alert('Added!');
              resetForm();
            } catch (error) {}
          }}
        >
          <StForm encType="multipart/form-data">
            <StFormSection>
              <label htmlFor="name">Select the apartment name: </label>
              <Field name="name" placeholder="Name" type="text" />
              <ErrorMessage name="name" />
            </StFormSection>
            <StFormSection>
              <label htmlFor="codeID">Select the apartment code: </label>
              <Field name="codeID" placeholder="Number" type="text" />
              <ErrorMessage name="codeID" />
            </StFormSection>
            <StFormSection>
              <label htmlFor="price">Select the apartment price: </label>
              <Field name="price" placeholder="Price" type="number" />
              <ErrorMessage name="price" />
            </StFormSection>
            <StFormSection>
              <label htmlFor="description">
                Write the apartments description:
              </label>
              <Field
                name="description"
                placeholder="Description"
                as="textarea"
              />
              <ErrorMessage name="description" />
            </StFormSection>
            <StPhotoInput>
              <label>Attach the photos</label>
              <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                  <StLabel {...getRootProps()}>
                    <input {...getInputProps()} />
                  </StLabel>
                )}
              </Dropzone>
              {/* <p>Upload the main photo: </p>
              <StLabel htmlFor="mainPhoto"></StLabel>
              <StField id="mainPhoto" name="mainPhoto" type="file" />
              <ErrorMessage name="mainPhoto" /> */}
            </StPhotoInput>
            <StBtn type="submit">add apartment</StBtn>
          </StForm>
        </Formik>
      </Container>
    </>
  );
};

export default AddApartment;
