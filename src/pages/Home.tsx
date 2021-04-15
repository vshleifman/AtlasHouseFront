import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 25em);
  margin-top: 1em;
`;

const Section = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
`;

const Text = styled.div`
  display: grid;
  grid-template-rows: 2em 2em auto;
  place-items: center;
`;

const Picture = styled.div`
  border: 1px solid black;
  height: 13em;
  width: 10em;
`;

const H3 = styled.h3`
  margin: 0;
`;

const Divider = styled.div`
  height: 0.125em;
  width: 3em;
  background-color: orange;
`;

const Home = ({ reference }: { reference: React.MutableRefObject<null> }) => {
  return (
    <Container ref={reference}>
      <Section>
        <Picture>pic</Picture>
        <Text>
          <H3>Welcome!</H3>
          <Divider />
          <p>
            May we help you to choose an apartment for your stay in Riga. We can
            offer around 20 differently designed flats located in the beautiful
            building Lacplesa 18, Riga. Apartments are available both for a long
            and short term. You can also book several apartments at a time so
            you can stay in a big group as well. Our apartments are maintained
            and rented out by a family who lives in the same building, so we are
            always at your disposal!
          </p>
        </Text>
      </Section>
      <Section>
        <Text>
          <H3>Find out we are in a great location!</H3>
          <Divider />

          <p>
            Our apartments are wonderfully located in the very centre of Riga,
            in the famous Art-Nouveau area. All you may possibly need is right
            in 1-2 min walk distance. Shopping Mall, food stores, cafes,
            hairdresser, parking, pool, pharmacy and even clinics. It will take
            you 10 min of a nice walk among beautiful buildings to the Old town.
            You can catch a trolley just round the corner to get to any part of
            the city. It's 20 min walk or 3 bus stops to the train station to go
            to Jurmala, Sigulda and other sights. Airport is 30 min by car.
          </p>
        </Text>
        <Picture>pic</Picture>
      </Section>
      <Section>
        <Picture>pic</Picture>
        <Text>
          <H3>Be enthusiastic about your stay here!</H3>
          <Divider />

          <p>
            All apartments are tastefully trimmed in eclectic style and are
            unique. So it's not easy to say which apartment looks nicer. Most of
            apartments boast their original wooden floors, doors and windows as
            well as decorated ceiling and fireplaces which are lovely combined
            with modern furniture and devices. Apartments are freshly renovated.
            Some of he apartments overlook a quiet yard and some of them
            overlook a beautiful Art-Nouveau street with trees. Some apartments
            have spacious bathrooms, some have showers. Almost in all apartments
            sitting room accommodates a kitchen. Kitchens are fully equipped.
            Apartments are on the 2, 3, 4 and 5 floor which a small lift brings
            you to.
          </p>
        </Text>
      </Section>
    </Container>
  );
};

export default Home;
