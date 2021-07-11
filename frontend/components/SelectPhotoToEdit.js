import { useQuery } from '@apollo/client';
import Search from './Search';
import PhotoCards from './PhotoCards';
import { ALL_PHOTOS_QUERY } from '../graphql/queries';
import WorkmodeContainer from './WorkmodeContainer';
import WorkmodeNav from './WorkmodeNav';

export default function SelectPhotoToEdit() {
  const {
    data: allPhotos,
    error: allPhotosError,
    loading: allPhotosLoading,
  } = useQuery(ALL_PHOTOS_QUERY);

  return (
    <WorkmodeContainer>
      <WorkmodeNav pageTitle="Edit Photos" />
      <PhotoCards allPhotos={allPhotos} />
    </WorkmodeContainer>
  );
}
