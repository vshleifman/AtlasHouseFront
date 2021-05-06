import api from 'api/axiosInstance';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Dropzone from 'react-dropzone';
import { Btn, Heading } from 'styles/styles';
import tw, { styled } from 'twin.macro';

const Container = styled.div`
  ${tw`grid justify-items-center`}
  grid-template: 'head' 10em 'form' / auto;

  input,
  textarea {
    ${tw`w-60 min-h-3 max-w-full content-center my-1`}
  }
`;

const StForm = styled(Form)`
  grid-area: form;
  display: grid;
  grid-template-rows: 1fr 1fr auto auto;
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
            <label htmlFor="description">Write the apartments description:</label>
            <Field name="description" placeholder="Description" as="textarea" />
            <ErrorMessage name="description" />
          </StFormSection>

          <div tw="border-b border-secondary border-dotted">
            <label>Attach the photos</label>
            <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <div
                  tw="border-2 border-solid border-secondary my-4 bg-thinPlusSvg bg-primary 
                  bg-center h-20 w-15 bg-no-repeat transition-all duration-200 hover:bg-thickPlusSvg 
                  hover:bg-hover hover:bg-center hover:bg-no-repeat"
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

          <StBtn type="submit">add apartment</StBtn>
        </StForm>
      </Formik>
    </Container>
  );
};

export default AddApartment;
