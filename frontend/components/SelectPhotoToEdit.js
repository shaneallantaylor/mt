import { useQuery } from '@apollo/client';
import PhotoCards from './PhotoCards';
import { ALL_PHOTOS_QUERY } from '../graphql/queries';
import { WorkmodeContainer } from '../styles';
import WorkmodeNav from './WorkmodeNav';

export default function SelectPhotoToEdit() {
  const { data: allPhotos } = useQuery(ALL_PHOTOS_QUERY);

  return (
    <WorkmodeContainer>
      <WorkmodeNav pageTitle="Edit Photos" />
      <PhotoCards allPhotos={allPhotos} />
    </WorkmodeContainer>
  );
}
