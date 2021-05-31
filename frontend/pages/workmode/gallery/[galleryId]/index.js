import { useMutation, useQuery } from '@apollo/client';
import { useRef, useState } from 'react';
import arrayMove from 'array-move';
import Button from '../../../../components/styles/Button';
import { UPDATE_GALLERY_MUTATION } from '../../../../graphql/mutations';
import {
  GALLERY_QUERY_WITH_SORTED_PHOTOS,
  ALL_PUBLISHED_GALLERIES_QUERY,
} from '../../../../graphql/queries';
import EasySort from '../../../../components/EasySort';

export default function EditGalleryPage({ query }) {
  const { galleryId } = query;
  const nameInput = useRef(null);
  const descriptionInput = useRef(null);
  const statusInputHidden = useRef(null);
  const statusInputPublished = useRef(null);
  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GALLERY_QUERY_WITH_SORTED_PHOTOS, {
    variables: {
      id: galleryId,
    },
  });
  console.log('queryData is', queryData);

  const [photoList, setPhotoList] = useState(queryData?.sortedPhotos);

  const onSortEnd = (oldIndex, newIndex) => {
    setPhotoList((array) => arrayMove(array, oldIndex, newIndex));
  };

  const [
    updateGallery,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(UPDATE_GALLERY_MUTATION);
  console.log(' mutationError is', mutationError);
  if (queryLoading) return <p>LOADING YOO</p>;
  if (queryError)
    return (
      <p>
        There was an error. I bet the gallery ID in the URL is wrong. Did you
        try to type it yourself?
      </p>
    );

  // logic section for this component if we have all the data we need

  function handleStatusChange() {
    console.log('you fired handleStatusChange!');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // get things we need from the refs
    // refs baby
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
    // get the photos
    // fire updateGallery
    console.log('photoList inside handleSubmit is', photoList);
    /*
      It's an array of objects
        each object has an id with the id (we need that)
        that's actually all I need

    */
    const res = await updateGallery({
      variables: {
        galleryId,
        galleryName,
        galleryDescription,
        photosToConnect,
        photosWithOrder,
      },
    });

    /*
    gallery: 
    id: "605fe33cec2ad4048ee85601"
    data: {
      name: "mut gallery"
      description: "followed by updating these photos"
      photos: {
        disconnectAll: true
        connect: [
          { id: "605fe33aec2ad4048ee855ef" }
          { id: "605fe33aec2ad4048ee855f0" }
          { id: "605fe33aec2ad4048ee855f3" }
          { id: "605fe33aec2ad4048ee855f4" }
          { id: "605fe33aec2ad4048ee855f5" }
        ]
      }
    }

    Photos with order
    (
    data: [
      { id: "605fe33aec2ad4048ee855ef", data: { order: 77 } }
      { id: "605fe33aec2ad4048ee855f0", data: { order: 2984 } }
      { id: "605fe33aec2ad4048ee855f3", data: { order: 32 } }
      { id: "605fe33aec2ad4048ee855f4", data: { order: 495 } }
      { id: "605fe33aec2ad4048ee855f5", data: { order: 7 } }
    ]
  )


    */

    // ! Add toast for success
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    console.log('res is', res);
  }

  // TODO: Add 'status" data to modify
  return (
    <div style={{ color: 'black ' }}>
      <form onSubmit={handleSubmit}>
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
        <div>
          {
            // ! Fix status toggle
          }
          <label htmlFor="status">
            Hidden
            <input
              ref={statusInputHidden}
              type="radio"
              id="status"
              name="status"
              value="HIDDEN"
              checked={queryData?.gallery.status === 'HIDDEN'}
              onChange={handleStatusChange}
            />
            <label htmlFor="status">
              Published
              <input
                ref={statusInputPublished}
                type="radio"
                id="status"
                name="status"
                value="PUBLISHED"
                checked={queryData?.gallery.status === 'PUBLISHED'}
                onChange={handleStatusChange}
              />
            </label>
          </label>
        </div>
        <EasySort onSortEnd={onSortEnd} photos={photoList} />
        <Button type="submit">Save Changes</Button>
      </form>
      {mutationError && <p>oh no error</p>}
    </div>
  );
}
