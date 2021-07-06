import { useMutation } from '@apollo/client';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { ALL_PHOTOS_QUERY } from '../graphql/queries';
import { CREATE_PHOTO_MUTATION } from '../graphql/mutations';
import WorkmodeContainer from './WorkmodeContainer';
import WorkmodeNav from './WorkmodeNav';
import {
  Button,
  ExtraInfo,
  FileInput,
  RadioOption,
  SelectRadios,
  TextInput,
} from '../styles';
import { renderSuccessToast } from './toasts';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  margin-bottom: 40px;
`;

export default function CreatePhoto() {
  const nameInput = useRef(null);
  const altInput = useRef(null);
  const descriptionInput = useRef(null);
  const fileInput = useRef(null);
  const formEl = useRef(null);
  const [background, setBackground] = useState(null);
  const [status, setStatus] = useState(null);
  const [photoCreated, setPhotoCreated] = useState(false);

  const [createPhoto, { loading, data }] = useMutation(CREATE_PHOTO_MUTATION, {
    refetchQueries: [{ query: ALL_PHOTOS_QUERY }],
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const name = nameInput.current.value;
    const alt = altInput.current.value;
    const description = descriptionInput.current.value;
    const file = fileInput.current.files[0];

    await createPhoto({
      variables: {
        name,
        alt,
        description,
        image: file,
        status: status ? 'PUBLISHED' : 'HIDDEN',
        background,
      },
    });

    renderSuccessToast();
    formEl.current.reset();
    setPhotoCreated(true);
  }

  return (
    <WorkmodeContainer>
      <WorkmodeNav pageTitle="Add Photo" />
      <form ref={formEl} onSubmit={handleSubmit}>
        <Grid>
          <div>
            <label htmlFor="title">
              <div>Name</div>
              <TextInput
                id="title"
                ref={nameInput}
                disabled={loading}
                aria-busy={loading}
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
                disabled={loading}
                aria-busy={loading}
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
                disabled={loading}
                aria-busy={loading}
              />
            </label>
          </div>
        </Grid>
        <Grid>
          <div>
            <label htmlFor="image">
              <div>Image</div>
              <FileInput ref={fileInput} type="file" id="image" name="image" />
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
          <div>
            <div>Use as a Homepage Background?</div>
            <SelectRadios>
              <RadioOption selected={!background} htmlFor="background-nah">
                Nah
                <input
                  type="radio"
                  id="background-nah"
                  name="background"
                  value="nah"
                  onChange={() => setBackground(false)}
                />
              </RadioOption>
              <RadioOption selected={background} htmlFor="background-yeah">
                Yeah
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
        <Button loading={loading} type="submit">
          {loading ? 'Working...' : 'Create Photo'}
        </Button>
      </form>
      {photoCreated && (
        <ExtraInfo>
          <p>
            Want to{' '}
            <Link href={`/workmode/photo/${data?.createPhoto?.id}`}>
              edit the photo you just made
            </Link>{' '}
            or <Link href="/workmode/gallery">edit galleries</Link> to add the
            photo to a gallery? <strong>Do it</strong>.
          </p>
        </ExtraInfo>
      )}
    </WorkmodeContainer>
  );
}
