import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { ABOUT_QUERY } from '../graphql/queries';
import SocialMedia from './SocialMedia';

const AboutContainer = styled.div`
  background-color: var(--black);
  height: 100%;
  background-image: url(${({ backgroundSrc }) => backgroundSrc || ''});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 60px;
`;

const TextContainer = styled.div`
  max-width: 720px;

  p {
    white-space: pre-line;
    font-size: 1.1rem;
    text-align: center;
    color: var(--white);
    opacity: 1;
    margin: 0;
  }
`;

const SocialMediaContainer = styled.div`
  align-self: flex-start;
  margin-top: auto;
  padding-bottom: 30px;
  padding-left: 40px;
`;

export default function About() {
  const { data: aboutData } = useQuery(ABOUT_QUERY);

  return (
    <AboutContainer
      backgroundSrc={aboutData?.about.background.image.publicUrlTransformed}
    >
      <TextContainer>
        <p>{aboutData?.about.text}</p>
      </TextContainer>
      <SocialMediaContainer>
        <SocialMedia />
      </SocialMediaContainer>
    </AboutContainer>
  );
}
