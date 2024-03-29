import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import arrayMove from 'array-move';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import EasySort from './EasySort';
import Button from '../styles/Button';
import {
  DELETE_GALLERY_MUTATION,
  UPDATE_GALLERY_MUTATION,
} from '../graphql/mutations';
import {
  ALL_GALLERIES_QUERY,
  ALL_PUBLISHED_GALLERIES_QUERY,
  GALLERY_QUERY_WITH_SORTED_PHOTOS,
  GET_PHOTOS_WITH_NO_GALLERY,
} from '../graphql/queries';
import SelectRadios from '../styles/SelectRadios';
import WorkmodeNav from './WorkmodeNav';
import SelectPhotosToAddToGallery from './SelectPhotosToAddToGallery';
import { renderSuccessToast } from './toasts';
import {
  DestructiveButton,
  FlexSpaceBetween,
  RadioOption,
  TextInput,
  WorkmodeContainer,
} from '../styles';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  margin-bottom: 40px;
`;

const ChangeBackgroundContainer = styled.div`
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  padding-bottom: ${({ open }) => (open ? '20px' : '0px')};
`;

const ChangeBackgroundToggle = styled.label`
  cursor: pointer;
  display: block;
  position: relative;

  &:after {
    content: '<';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 20px;
    height: 20px;
    transition: transform 0.5s ease;
    transform: ${({ checked }) =>
      checked ? 'rotate(-90deg) translate(-10px, -15px) ' : 'none'};
  }

  input {
    border: 0px;
    clip: rect(0px, 0px, 0px, 0px);
    height: 1px;
    overflow: hidden;
    padding: 0px;
    position: absolute;
    white-space: nowrap;
    width: 1px;
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

  const { data: possiblePhotos, error: possiblePhotosError } = useQuery(
    GET_PHOTOS_WITH_NO_GALLERY
  );

  const [photoList, setPhotoList] = useState(queryData?.sortedPhotos);
  const [status, setStatus] = useState(queryData?.gallery?.status !== 'HIDDEN');
  const [selectedPhotos, setSelectedPhotos] = useState({});
  const [addPhotosChecked, setAddPhotosChecked] = useState(false);
  const nameInput = useRef(queryData?.gallery?.name);
  const descriptionInput = useRef(null);
  const router = useRouter();

  function handleChangeBackgroundToggle(e) {
    setAddPhotosChecked(e.target.checked);
  }

  const onSortEnd = (oldIndex, newIndex) => {
    setPhotoList((array) => arrayMove(array, oldIndex, newIndex));
  };

  const [
    updateGallery,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(UPDATE_GALLERY_MUTATION);

  const [
    deleteGallery,
    { loading: deleteLoading, error: deleteError },
  ] = useMutation(DELETE_GALLERY_MUTATION);

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
        galleryStatus: status ? 'PUBLISHED' : 'HIDDEN',
        photosToConnect,
        photosWithOrder,
      },
      refetchQueries: [
        {
          query: GALLERY_QUERY_WITH_SORTED_PHOTOS,
          variables: {
            id: galleryId,
          },
        },
        { query: ALL_PUBLISHED_GALLERIES_QUERY },
      ],
    });
    renderSuccessToast();
    setAddPhotosChecked(false);
  }

  function handleAddPhotos(e) {
    e.preventDefault();
    const checkedPhotos = Object.entries(selectedPhotos)
      .filter(([_, { checked }]) => checked === true)
      .map(([_, { photo }]) => photo);
    const newPhotoList = [...checkedPhotos, ...photoList];
    setPhotoList(newPhotoList);
  }

  function handleRemovePhoto(e) {
    const index = parseInt(e.target.dataset.idx);
    const newPhotoList = [...photoList];
    newPhotoList.splice(index, 1);
    setPhotoList(newPhotoList);
  }

  function handleSelect(e) {
    setSelectedPhotos({
      ...selectedPhotos,
      [e.target.id]: {
        checked: e.target.checked,
        photo: JSON.parse(e.target.dataset.photo),
      },
    });
  }

  async function handleDeleteGallery(e) {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete the gallery?')) {
      await deleteGallery({
        variables: {
          id: galleryId,
        },
        refetchQueries: [{ query: ALL_GALLERIES_QUERY }],
      });
      router.replace('/workmode/gallery');
    } else {
      console.log('NVM, doing nothing');
    }
  }

  useEffect(() => {
    setPhotoList(queryData?.sortedPhotos);
  }, [queryData?.sortedPhotos]);

  useEffect(() => {
    setStatus(queryData?.gallery?.status !== 'HIDDEN');
  }, [queryData?.gallery?.status]);

  return (
    <WorkmodeContainer>
      <WorkmodeNav pageTitle="Edit Gallery" />
      <form onSubmit={handleSubmit} disabled={mutationLoading}>
        <Grid>
          <div>
            <label htmlFor="title">
              <div>Name</div>
              <TextInput
                type="text"
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
        <ChangeBackgroundContainer open={addPhotosChecked}>
          <ChangeBackgroundToggle
            htmlFor="background-toggle"
            checked={addPhotosChecked}
            onInput={handleChangeBackgroundToggle}
          >
            Add Photos
            <input id="background-toggle" type="checkbox" />
          </ChangeBackgroundToggle>
          <SelectPhotosToAddToGallery
            open={addPhotosChecked}
            handleSelect={handleSelect}
            selectedPhotos={selectedPhotos}
            possiblePhotos={possiblePhotos}
            handleAddPhotos={handleAddPhotos}
          />
        </ChangeBackgroundContainer>
        <EasySort
          onSortEnd={onSortEnd}
          photos={photoList}
          handleRemovePhoto={handleRemovePhoto}
        />
        <FlexSpaceBetween>
          <Button type="submit">Save Changes</Button>
          <DestructiveButton type="button" onClick={handleDeleteGallery}>
            Delete Gallery
          </DestructiveButton>
        </FlexSpaceBetween>
      </form>
    </WorkmodeContainer>
  );
}

EditGallery.propTypes = {
  query: PropTypes.object,
};
