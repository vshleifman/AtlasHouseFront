import tw, { styled } from 'twin.macro';

const Section = ({ title, content }: { title: string; content: JSX.Element }) => {
  const Container = styled.div`
    label {
      ${tw`justify-self-start pl-3 pr-1 my-2`}
    }
    input {
      ${tw`custom-input min-w-35 my-1`}
    }
  `;
  return (
    <Container>
      <section tw="flex">
        <div tw="flex flex-basis-8 items-center justify-center flex-grow bg-gradient-to-l to-white from-light-gray">
          <h3>{title}</h3>
        </div>

        <div tw="bg-light-gray flex items-center">
          <div tw="h-8/12 width[1px] bg-secondary"></div>
        </div>

        <div tw="flex py-2 items-center justify-start flex-grow[3] flex-basis-5 bg-gradient-to-r from-light-gray to-white">
          {content}
        </div>
      </section>
    </Container>
  );
};

export default Section;
