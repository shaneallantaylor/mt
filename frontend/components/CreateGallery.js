import { useMutation } from '@apollo/client';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { ALL_PUBLISHED_GALLERIES_QUERY } from '../graphql/queries';
import { CREATE_GALLERY_MUTATION } from '../graphql/mutations';
import WorkmodeNav from './WorkmodeNav';
import { renderSuccessToast } from './toasts';
import {
  Button,
  ExtraInfo,
  RadioOption,
  SelectRadios,
  TextInput,
  WorkmodeContainer,
} from '../styles';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  margin-bottom: 10px;
`;

export default function CreateGallery() {
  const nameInput = useRef(null);
  const descriptionInput = useRef(null);
  const formEl = useRef(null);
  const [status, setStatus] = useState(null);
  const [galleryCreated, setGalleryCreated] = useState(false);

  const [createGallery, { loading, data }] = useMutation(
    CREATE_GALLERY_MUTATION
  );

  async function handleSubmit(e) {
    e.preventDefault();
    const name = nameInput.current.value;
    const description = descriptionInput.current.value;

    await createGallery({
      variables: {
        name,
        description,
        status: status ? 'PUBLISHED' : 'HIDDEN',
      },
      refetchQueries: { query: ALL_PUBLISHED_GALLERIES_QUERY },
    });

    renderSuccessToast();
    formEl.current.reset();
    setGalleryCreated(true);
  }

  return (
    <WorkmodeContainer>
      <WorkmodeNav pageTitle="Create Gallery" />
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
        <div style={{ marginBottom: '20px' }}>
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
        <Button loading={loading.toString()} type="submit">
          {loading ? 'Working...' : 'Create Gallery'}
        </Button>
      </form>
      {galleryCreated && (
        <ExtraInfo>
          <p>
            Want to{' '}
            <Link href={`/workmode/gallery/${data?.createGallery?.id}`}>
              edit the gallery you just made
            </Link>
            ? <strong>Do it</strong>.
          </p>
        </ExtraInfo>
      )}
    </WorkmodeContainer>
  );
}
