import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../styles/Button';
import {
  UPDATE_PHOTO_MUTATION,
  DELETE_PHOTO_MUTATION,
} from '../graphql/mutations';
import { PHOTO_QUERY } from '../graphql/queries';
import WorkmodeNav from './WorkmodeNav';
import {
  DestructiveButton,
  FlexSpaceBetween,
  RadioOption,
  SelectRadios,
  TextInput,
  WorkmodeContainer,
} from '../styles';
import { renderSuccessToast } from './toasts';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  margin-bottom: 40px;
`;

export default function EditPhoto({ query: { photoId } }) {
  const nameInput = useRef(null);
  const descriptionInput = useRef(null);
  const altInput = useRef(null);
  const router = useRouter();
  const { data, error, loading } = useQuery(PHOTO_QUERY, {
    variables: {
      id: photoId,
    },
  });
  const [background, setBackground] = useState(data?.photo?.backgroundImage);
  const [status, setStatus] = useState(data?.photo?.status !== 'HIDDEN');

  const [updatePhoto, { loading: mutationLoading }] = useMutation(
    UPDATE_PHOTO_MUTATION
  );

  const [deletePhoto] = useMutation(DELETE_PHOTO_MUTATION);

  async function handleSubmit(e) {
    e.preventDefault();
    const name = nameInput.current.value;
    const description = descriptionInput.current.value;
    const alt = altInput.current.value;
    await updatePhoto({
      variables: {
        id: photoId,
        name,
        description,
        alt,
        status: status ? 'PUBLISHED' : 'HIDDEN',
        background,
      },
      refetchQueries: [{ query: PHOTO_QUERY, variables: { id: photoId } }],
    });
    renderSuccessToast();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleDeletePhoto(e) {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete the photo?')) {
      await deletePhoto({
        variables: {
          id: photoId,
        },
      });
      router.replace('/workmode/photo/all');
    } else {
      console.log('NVM, doing nothing');
    }
  }

  useEffect(() => {
    setStatus(data?.photo?.status !== 'HIDDEN');
  }, [data?.photo?.status]);

  useEffect(() => {
    setBackground(data?.photo?.backgroundImage);
  }, [data?.photo?.backgroundImage]);

  if (error) return null;
  return (
    <WorkmodeContainer>
      <WorkmodeNav pageTitle="Edit Photo" />
      <form onSubmit={handleSubmit} disabled={mutationLoading}>
        <img
          style={{
            maxWidth: '300px',
            margin: '0 auto',
            display: 'block',
            marginBottom: '20px',
          }}
          alt="The thing you are editing"
          src={data?.photo.image.publicUrlTransformed}
        />
        <Grid>
          <div>
            <label htmlFor="name">
              <div>Name</div>
              <TextInput
                type="text"
                id="name"
                ref={nameInput}
                disabled={loading.toString()}
                aria-busy={loading.toString()}
                defaultValue={data?.photo?.name}
              />
            </label>
          </div>
          <div>
            <label htmlFor="alt">
              <div>Alt Text</div>
              <TextInput
                type="text"
                id="alt"
                ref={altInput}
                disabled={loading.toString()}
                aria-busy={loading.toString()}
                defaultValue={data?.photo?.altText}
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
                disabled={loading.toString()}
                aria-busy={loading.toString()}
                defaultValue={data?.photo?.description}
              />
            </label>
          </div>
        </Grid>
        <Grid>
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
          <div>
            <div>Use as a Homepage Background?</div>
            <SelectRadios>
              <RadioOption selected={!background} htmlFor="background-nah">
                Nope
                <input
                  type="radio"
                  id="background-nah"
                  name="background"
                  value="nah"
                  onChange={() => setBackground(false)}
                />
              </RadioOption>
              <RadioOption selected={background} htmlFor="background-yeah">
                Sure
                <input
                  type="radio"
                  id="background-yeah"
                  name="background"
                  value="yeah"
                  onChange={() => setBackground(true)}
                />
              </RadioOption>
            </SelectRadios>
          </div>
        </Grid>
        <FlexSpaceBetween>
          <Button type="submit">Save Changes</Button>
          <DestructiveButton type="button" onClick={handleDeletePhoto}>
            Delete Photo
          </DestructiveButton>
        </FlexSpaceBetween>
      </form>
    </WorkmodeContainer>
  );
}

EditPhoto.propTypes = {
  query: PropTypes.object,
};
