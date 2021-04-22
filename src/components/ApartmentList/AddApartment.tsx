import api from "api/axiosInstance";
import { ErrorMessage, Field, Form, Formik } from "formik";
import styled, { createGlobalStyle } from "styled-components";
import { Heading } from "styles/styles";

const GlobalStyle = createGlobalStyle`
  input, textarea {
    min-height: 3em;
    width: 60em;
    max-width: 100%;
    font-family: inherit;
    align-content: center;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template: "head" 5em " form " auto / auto;
`;

const StForm = styled(Form)`
  grid-area: form;
  display: grid;
  grid-template-rows: 1fr 1fr auto auto;
  margin-top: 5em;
`;

const StLabel = styled.label`
  border: 2px solid orange;
  padding: 0 5em 11em 5em;
  background: rgba(21, 34, 107, 0.788);
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xMSAxMXYtMTFoMXYxMWgxMXYxaC0xMXYxMWgtMXYtMTFoLTExdi0xaDExeiIvPjwvc3ZnPg==");
  background-position: center;
  background-repeat: no-repeat;
  transition: background-color 0.2s, background-image 0.2s;

  &:hover {
    background: rgba(65, 90, 233, 0.288);
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTMgMnY5aDl2MmgtOXY5aC0ydi05aC05di0yaDl2LTloMnptMi0yaC02djloLTl2Nmg5djloNnYtOWg5di02aC05di05eiIvPjwvc3ZnPg==");
    background-position: center;
    background-repeat: no-repeat;
    transition: background-color 0.2s, background-image 0.2s;
  }
`;

const StField = styled(Field)`
  display: none;
`;

const StPhotoInput = styled.div`
  margin-top: 2em;
`;

const AddApartment = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Heading>Add A New Apartment</Heading>
        <Formik
          initialValues={{
            name: "",
            description: "",
            mainPhoto: "",
            otherPhotos: undefined,
            price: "",
          }}
          onSubmit={(values) => {
            const data = new FormData();
            data.append("mainPhoto", values.name);
            console.log(data);

            try {
              api.post(
                "/properties",
                { banana: "yoghurt" },
                { headers: { "Content-Type": "multipart/form-data" } }
              );
            } catch (error) {
              console.log(error);
            }
          }}
        >
          <StForm encType="multipart/form-data">
            <div>
              <label htmlFor="name">Select the apartment name: </label>
              <Field name="name" placeholder="Name" type="text" />
              <ErrorMessage name="name" />
            </div>
            <div>
              <label htmlFor="price">Select the apartment price: </label>
              <Field name="price" placeholder="Price" type="number" />
              <ErrorMessage name="price" />
            </div>
            <div>
              <label htmlFor="description">
                Write the apartments description:
              </label>
              <Field
                name="description"
                placeholder="Description"
                as="textarea"
              />
              <ErrorMessage name="description" />
            </div>
            <StPhotoInput>
              <p>Upload the main photo: </p>
              <StLabel htmlFor="mainPhoto"></StLabel>
              <StField id="mainPhoto" name="mainPhoto" type="file" />
              <ErrorMessage name="mainPhoto" />
            </StPhotoInput>
            <button type="submit">submit</button>
          </StForm>
        </Formik>
      </Container>
    </>
  );
};

export default AddApartment;
