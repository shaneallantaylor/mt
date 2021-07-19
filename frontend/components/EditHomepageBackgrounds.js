import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import Link from 'next/link';
import Button from '../styles/Button';
import { UPDATE_HOMEPAGE_BACKGROUNDS } from '../graphql/mutations';
import { ALL_PHOTOS_QUERY } from '../graphql/queries';
import { renderSuccessToast } from './toasts';
import WorkmodeNav from './WorkmodeNav';
import BackgroundsTable from './BackgroundsTable';
import { ExtraInfo, WorkmodeContainer } from '../styles';

export default function EditHomepageBackgrounds() {
  const { data } = useQuery(ALL_PHOTOS_QUERY);

  const [
    updateHomepageBackgrounds,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(UPDATE_HOMEPAGE_BACKGROUNDS);

  const [photosToUpdate, setPhotosToUpdate] = useState({});

  function handleRadioChange(e) {
    const backgroundImage = e.target.value === 'yeah';

    setPhotosToUpdate({
      ...photosToUpdate,
      [e.target.dataset.photoid]: {
        backgroundImage,
      },
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const updateList = Object.entries(
      photosToUpdate
    ).map(([photoId, entryData]) => ({ id: photoId, data: entryData }));

    await updateHomepageBackgrounds({
      variables: {
        photosWithBackgroundStatus: updateList,
      },
      refetchQueries: [{ query: ALL_PHOTOS_QUERY }],
    });
    renderSuccessToast();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function hydratePhotosToUpdate(array) {
    const currentBackgrounds = array?.filter((photo) => photo.backgroundImage);
    const batchPhotosToUpdate = currentBackgrounds?.reduce((acc, photo) => {
      acc[photo.id] = { backgroundImage: true };
      return acc;
    }, {});
    setPhotosToUpdate({
      ...photosToUpdate,
      ...batchPhotosToUpdate,
    });
  }

  return (
    <WorkmodeContainer>
      <WorkmodeNav pageTitle="Edit Homepage Backgrounds" />
      <form onSubmit={handleSubmit} disabled={mutationLoading}>
        <BackgroundsTable
          photos={data?.allPhotos}
          handleRadioChange={handleRadioChange}
          photosBeingUpdated={photosToUpdate}
          hydratePhotosToUpdate={hydratePhotosToUpdate}
        />
        <Button loading={mutationLoading.toString()} type="submit">
          {mutationLoading ? 'Working...' : 'Save Changes'}
        </Button>
      </form>
      <ExtraInfo>
        <p>
          Want to <Link href="/workmode/photo/all">edit photos</Link> or{' '}
          <Link href="/workmode/photo/create">create a new photo</Link>?{' '}
          <strong>Do it</strong>.
        </p>
      </ExtraInfo>
    </WorkmodeContainer>
  );
}
