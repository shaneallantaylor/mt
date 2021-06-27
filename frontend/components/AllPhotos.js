import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import Search from './Search';
import PhotoCards from './PhotoCards';
import { ALL_PHOTOS_QUERY } from '../graphql/queries';

const AllPhotosContainer = styled.div`
  padding: 20px;
`;

export default function AllPhotos() {
  const {
    data: allPhotos,
    error: allPhotosError,
    loading: allPhotosLoading,
  } = useQuery(ALL_PHOTOS_QUERY);

  return (
    <AllPhotosContainer>
      <Search />
      <PhotoCards allPhotos={allPhotos} />
    </AllPhotosContainer>
  );
}
