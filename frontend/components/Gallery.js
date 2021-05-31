import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Photo from './Photo';
import { GALLERY_PHOTOS_BY_NAME_QUERY } from '../graphql/queries';

const GalleryStyles = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  grid-auto-rows: 1fr;
  grid-auto-flow: dense;
  grid-gap: 0.6em;
  justify-content: center;
`;

export default function Gallery() {
  const router = useRouter();
  const { gallerySlug } = router.query;
  const { data, error, loading } = useQuery(GALLERY_PHOTOS_BY_NAME_QUERY, {
    variables: { galleryName: gallerySlug },
  });
  const photos = data?.allGalleries[0]?.photos || [];

  if (loading) return <h2>WE LOADING...</h2>;

  return (
    <GalleryStyles>
      {photos.map((photo) => (
        <Photo {...photo} />
      ))}
    </GalleryStyles>
  );
}
