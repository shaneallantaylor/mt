import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import arrayMove from 'array-move';
import Button from '../../../../components/styles/Button';
import { UPDATE_GALLERY_MUTATION } from '../../../../graphql/mutations';
import {
  GALLERY_QUERY_WITH_SORTED_PHOTOS,
  GET_PHOTOS_WITH_NO_GALLERY,
} from '../../../../graphql/queries';
import EasySort from '../../../../components/EasySort';
import Loading from '../../../../components/Loading';
import Error from '../../../../components/Error';
import SelectRadios from '../../../../components/styles/SelectRadios';
import AddPhotosToGallery from '../../../../components/AddPhotosToGallery';

export default function EditGalleryPage({ query }) {
  const { galleryId } = query;
  const nameInput = useRef(null);
  const descriptionInput = useRef(null);
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

  const onSortEnd = (oldIndex, newIndex) => {
    setPhotoList((array) => arrayMove(array, oldIndex, newIndex));
  };

  const [
    updateGallery,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(UPDATE_GALLERY_MUTATION);

  function handleStatusChange(e) {
    setStatus(e.target.value);
  }

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

  return (
    <div style={{ color: 'black ' }}>
      <Error content={mutationError || queryError || possiblePhotosError} />
      <Loading size="big" content={mutationLoading || queryLoading} />
      <form onSubmit={handleSubmit} disabled={mutationLoading}>
        <label htmlFor="name">
          Name
          <input
            ref={nameInput}
            disabled={queryLoading}
            aria-busy={queryLoading}
            id="name"
            name="name"
            defaultValue={queryData?.gallery.name}
          />
        </label>
        <label htmlFor="description">
          Description
          <input
            ref={descriptionInput}
            type="text"
            id="description"
            name="description"
            defaultValue={queryData?.gallery.description}
          />
        </label>
        <SelectRadios>
          <label htmlFor="status-hidden">
            Hidden
            <input
              type="radio"
              id="status-hidden"
              name="status-hidden"
              value="HIDDEN"
              checked={status === 'HIDDEN'}
              onChange={handleStatusChange}
            />
          </label>
          <label htmlFor="status-pub">
            Published
            <input
              type="radio"
              id="status-pub"
              name="status-pub"
              value="PUBLISHED"
              checked={status === 'PUBLISHED'}
              onChange={handleStatusChange}
            />
          </label>
        </SelectRadios>
        <button type="button" onClick={getPossiblePhotos}>
          I want to add photos
        </button>
        <AddPhotosToGallery
          handleCheckboxInputChange={handleCheckboxInputChange}
          handleAddPhotos={handleAddPhotos}
          checkboxes={checkboxes}
          possiblePhotos={possiblePhotos}
        />
        <EasySort
          onSortEnd={onSortEnd}
          photos={photoList}
          handleRemovePhoto={handleRemovePhoto}
        />

        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
}

EditGalleryPage.propTypes = {
  query: PropTypes.object,
};
