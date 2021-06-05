import { useMutation, useQuery } from '@apollo/client';
import { useRef } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Button from '../../../components/styles/Button';
import {
  UPDATE_PHOTO_MUTATION,
  DELETE_PHOTO_MUTATION,
} from '../../../graphql/mutations';
import { PHOTO_QUERY } from '../../../graphql/queries';
import Loading from '../../../components/Loading';
import Error from '../../../components/Error';

export default function EditGalleryPage({ query: { photoId } }) {
  const nameInput = useRef(null);
  const descriptionInput = useRef(null);
  const altInput = useRef(null);
  const router = useRouter();
  const { data, error, loading } = useQuery(PHOTO_QUERY, {
    variables: {
      id: photoId,
    },
  });

  const [
    updatePhoto,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(UPDATE_PHOTO_MUTATION);

  const [
    deletePhoto,
    { loading: deleteLoading, error: deleteError },
  ] = useMutation(DELETE_PHOTO_MUTATION);

  async function handleSubmit(e) {
    e.preventDefault();

    const name = nameInput.current.value;
    const description = descriptionInput.current.value;
    const altText = altInput.current.value;
    await updatePhoto({
      variables: {
        id: photoId,
        name,
        description,
        altText,
      },
    });
    // ! Add toast for success
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  async function handleDeletePhoto() {
    await deletePhoto({
      variables: {
        id: photoId,
      },
    });
    router.replace('/workmode/photo');
    console.log('you should leave now');
  }

  if (error) return null;
  return (
    <div style={{ color: 'black ' }}>
      <Error content={mutationError || error} />
      <Loading size="big" content={mutationLoading || loading} />
      <form onSubmit={handleSubmit} disabled={mutationLoading}>
        <label>
          Name
          <input
            ref={nameInput}
            disabled={loading}
            aria-busy={loading}
            type="text"
            defaultValue={data?.photo.name}
          />
        </label>
        <label>
          Description
          <input
            ref={descriptionInput}
            type="text"
            name="description"
            defaultValue={data?.photo.description}
          />
        </label>
        <label>
          Alt Text
          <input
            ref={altInput}
            type="text"
            name="alt"
            defaultValue={data?.photo.altText}
          />
        </label>
        <img
          alt={data?.photo.altText}
          src={data?.photo.image.publicUrlTransformed}
        />
        <Button type="submit">Save Changes</Button>
        <button type="button" onClick={handleDeletePhoto}>
          Delete this photo
        </button>
      </form>
    </div>
  );
}

EditGalleryPage.propTypes = {
  query: PropTypes.object,
};
