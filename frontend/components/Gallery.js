import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { GALLERY_PHOTOS_BY_SLUG_QUERY } from '../graphql/queries';
import Photo from './Photo';

const GalleryContainer = styled.section`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  grid-auto-rows: 1fr;
  grid-auto-flow: dense;
  grid-gap: 20px;
  justify-content: center;
`;

export default function Gallery() {
  const router = useRouter();
  const { gallerySlug } = router.query;
  const { data } = useQuery(GALLERY_PHOTOS_BY_SLUG_QUERY, {
    variables: { gallerySlug },
  });
  const photos = data?.allGalleries[0]?.photos || [];

  return (
    <GalleryContainer>
      {photos.map((photo) => (
        <Photo
          key={photo.id}
          id={photo.id}
          image={photo.image}
          name={photo.name}
          gallery={photo.gallery}
        />
      ))}
    </GalleryContainer>
  );
}
