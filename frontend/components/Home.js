import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { ALL_HOMEPAGE_BACKGROUNDS_QUERY } from '../graphql/queries';
import shuffleArray from '../lib/shuffleArray';
import breakpoints from '../theme/breakpoints';

const HomeStyles = styled.div`
  background-image: url(${({ backgroundImage }) => backgroundImage});
  background-position: center;
  height: calc(100% - 103px);
  width: 100vw;
  background-size: cover;
  position: fixed;
  top: 103px;
  left: 0;
  z-index: 0;

  @media ${breakpoints.tabLand} {
    height: calc(100% - 65px);
    top: 65px;
  }
`;

export default function Home() {
  const { data, loading } = useQuery(ALL_HOMEPAGE_BACKGROUNDS_QUERY);
  // SELECT ONE (random or specific)
  if (loading) return null;
  const shuffledArray = shuffleArray(data.backgroundPhotos);
  return (
    <HomeStyles
      backgroundImage={shuffledArray[0]?.image.publicUrlTransformed}
    />
  );
}
