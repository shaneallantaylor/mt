import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import arrayMove from 'array-move';
import styled from 'styled-components';
import EasySort from './EasySort';
import Button from '../styles/Button';
import { UPDATE_GALLERY_MUTATION } from '../graphql/mutations';
import {
  GALLERY_QUERY_WITH_SORTED_PHOTOS,
  GET_PHOTOS_WITH_NO_GALLERY,
} from '../graphql/queries';
import Loading from './Loading';
import Error from './Error';
import SelectRadios from '../styles/SelectRadios';
import AddPhotosToGallery from './AddPhotosToGallery';
import WorkmodeContainer from './WorkmodeContainer';
import WorkmodeNav from './WorkmodeNav';
import { RadioOption, TextInput } from '../styles';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  margin-bottom: 40px;
`;

const PossiblePhotosContainer = styled.div`
  background: green;
`;

const AddPhotosToggle = styled.span`
  &:after {
    content: '<';
    width: 20px;
    height: 20px;
  }
`;

export default function EditGallery({ query }) {
  const { galleryId } = query;
  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GALLERY_QUERY_WITH_SORTED_PHOTOS, {
    variables: {
      id: galleryId,
    },
  });

  const [
    getPossiblePhotos,
    {
      data: possiblePhotos,
      loading: possiblePhotosLoading,
      error: possiblePhotosError,
    },
  ] = useLazyQuery(GET_PHOTOS_WITH_NO_GALLERY);

  const [photoList, setPhotoList] = useState(queryData?.sortedPhotos);
  const [status, setStatus] = useState(queryData?.gallery?.status);
  const [checkboxes, setCheckboxes] = useState({});
  const nameInput = useRef(queryData?.gallery?.name);
  const descriptionInput = useRef(null);

  const onSortEnd = (oldIndex, newIndex) => {
    setPhotoList((array) => arrayMove(array, oldIndex, newIndex));
  };

  const [
    updateGallery,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(UPDATE_GALLERY_MUTATION);

  async function handleSubmit(e) {
    e.preventDefault();

    const galleryName = nameInput.current.value;
    const galleryDescription = descriptionInput.current.value;
    const photosToConnect = photoList.map((photo) => ({
      id: photo.id,
    }));
    const photosWithOrder = photoList.map((photo, idx) => ({
      id: photo.id,
      data: {
        order: idx,
      },
    }));
    await updateGallery({
      variables: {
        galleryId,
        galleryName,
        galleryDescription,
        galleryStatus: status,
        photosToConnect,
        photosWithOrder,
      },
    });
    // ! Add toast for success
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  function handleAddPhotos() {
    const checkedPhotos = Object.entries(checkboxes)
      .filter(([_, { checked }]) => checked === true)
      .map(([_, { photo }]) => photo);
    const newPhotoList = [...checkedPhotos, ...photoList];
    setPhotoList(newPhotoList);
  }

  function handleRemovePhoto(e) {
    console.log('e.target.dataset.idx', e.target.dataset.idx);
    const index = parseInt(e.target.dataset.idx);
    const newPhotoList = [...photoList];
    newPhotoList.splice(index, 1);
    setPhotoList(newPhotoList);
    console.log('you attemped to remove');
  }

  function handleCheckboxInputChange(e) {
    setCheckboxes({
      ...checkboxes,
      [e.target.id]: {
        checked: e.target.checked,
        photo: JSON.parse(e.target.dataset.photo),
      },
    });
  }

  useEffect(() => {
    setPhotoList(queryData?.sortedPhotos);
  }, [queryData?.sortedPhotos]);

  useEffect(() => {
    setStatus(queryData?.gallery?.status);
  }, [queryData?.gallery?.status]);

  return (
    <WorkmodeContainer>
      <WorkmodeNav pageTitle="Edit Gallery" />
      <Error content={mutationError || queryError || possiblePhotosError} />
      <Loading size="big" content={mutationLoading || queryLoading} />
      <form onSubmit={handleSubmit} disabled={mutationLoading}>
        <Grid>
          <div>
            <label htmlFor="title">
              <div>Name</div>
              <TextInput
                id="title"
                ref={nameInput}
                disabled={mutationLoading}
                aria-busy={mutationLoading}
                defaultValue={queryData?.gallery?.name}
              />
            </label>
          </div>
          <div>
            <label htmlFor="description">
              <div>Description</div>
              <TextInput
                type="text"
                id="description"
                ref={descriptionInput}
                disabled={mutationLoading}
                aria-busy={mutationLoading}
                defaultValue={queryData?.gallery?.description}
              />
            </label>
          </div>
          <div>
            <div>Status</div>
            <SelectRadios>
              <RadioOption selected={!status} htmlFor="status-hidden">
                Hidden
                <input
                  type="radio"
                  id="status-hidden"
                  name="status"
                  value="HIDDEN"
                  onChange={() => setStatus(false)}
                />
              </RadioOption>
              <RadioOption selected={status} htmlFor="status-pub">
                Published
                <input
                  type="radio"
                  id="status-pub"
                  name="status"
                  value="PUBLISHED"
                  onChange={() => setStatus(true)}
                />
              </RadioOption>
            </SelectRadios>
          </div>
        </Grid>
        <PossiblePhotosContainer>
          <AddPhotosToggle role="button" onClick={getPossiblePhotos}>
            Add Photos
          </AddPhotosToggle>
          <AddPhotosToGallery
            handleCheckboxInputChange={handleCheckboxInputChange}
            handleAddPhotos={handleAddPhotos}
            checkboxes={checkboxes}
            possiblePhotos={possiblePhotos}
          />
        </PossiblePhotosContainer>
        <EasySort
          onSortEnd={onSortEnd}
          photos={photoList}
          handleRemovePhoto={handleRemovePhoto}
        />
        <Button type="submit">Save Changes</Button>
      </form>
    </WorkmodeContainer>
  );
}

EditGallery.propTypes = {
  query: PropTypes.object,
};
