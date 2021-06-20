import styled from 'styled-components';
import tw from 'twin.macro';

import facade from 'images/facade.jpeg';
import WindowView from 'images/WindowView.jpeg';

const Container = styled.div`
  ${tw`flex flex-col w-1/2 mt-1 justify-around height[150rem]`}
`;

const Section = styled.section`
  display: flex;
  place-items: center;
  margin-top: 4rem;
`;

const Text = styled.div`
  display: grid;
  grid-template-rows: 2em 2em auto;
  place-items: center;
`;

const H3 = styled.h3`
  margin: 0;
  font-size: 2rem;
`;

const Divider = styled.div`
  height: 0.125em;
  width: 3em;
  background-color: orange;
`;

const About = ({ reference }: { reference: React.MutableRefObject<null> }) => {
  return (
    <Container ref={reference}>
      <Section>
        <img tw="h-auto w-auto mr-4" src={facade} alt="n" />
        <Text>
          <H3>Welcome!</H3>
          <Divider />
          <p>
            May we help you to choose an apartment for your stay in Riga. We can offer around 20 differently designed
            flats located in the beautiful building Lacplesa 18, Riga. Apartments are available both for a long and
            short term. You can also book several apartments at a time so you can stay in a big group as well. Our
            apartments are maintained and rented out by a family who lives in the same building, so we are always at
            your disposal!
          </p>
        </Text>
      </Section>
      <Section tw="flex-col">
        <Text>
          <H3>Find out we are in a great location!</H3>
          <Divider />

          <p>
            Our apartments are wonderfully located in the very centre of Riga, in the famous Art-Nouveau area. All you
            may possibly need is right in 1-2 min walk distance. Shopping Mall, food stores, cafes, hairdresser,
            parking, pool, pharmacy and even clinics. It will take you 10 min of a nice walk among beautiful buildings
            to the Old town. You can catch a trolley just round the corner to get to any part of the city. It's 20 min
            walk or 3 bus stops to the train station to go to Jurmala, Sigulda and other sights. Airport is 30 min by
            car.
          </p>
        </Text>
        <iframe
          tw="width[650px] height[400px] mt-4"
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJvTJLss3P7kYRFQknxwBM-OI&key=AIzaSyDm3v9y93pQYE1spSyLNDjC8F8UhRX5g68"
        ></iframe>
      </Section>
      <Section tw="width[145%] place-self-center">
        <img tw="h-30 w-auto mr-4" src={WindowView} alt="n" />

        <Text>
          <H3>Be enthusiastic about your stay here!</H3>
          <Divider />

          <p>
            All apartments are tastefully trimmed in eclectic style and are unique. So it's not easy to say which
            apartment looks nicer. Most of apartments boast their original wooden floors, doors and windows as well as
            decorated ceiling and fireplaces which are lovely combined with modern furniture and devices. Apartments are
            freshly renovated. Some of he apartments overlook a quiet yard and some of them overlook a beautiful
            Art-Nouveau street with trees. Some apartments have spacious bathrooms, some have showers. Almost in all
            apartments sitting room accommodates a kitchen. Kitchens are fully equipped. Apartments are on the 2, 3, 4
            and 5 floor which a small lift brings you to.
          </p>
        </Text>
      </Section>
    </Container>
  );
};

export default About;
