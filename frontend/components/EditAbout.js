import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../styles/Button';
import { UPDATE_ABOUT_MUTATION } from '../graphql/mutations';
import { ABOUT_QUERY, ALL_PHOTOS_QUERY } from '../graphql/queries';
import Loading from './Loading';
import Error from './Error';
import TextArea from './TextArea';
import { renderSuccessToast } from './toasts';
import WorkmodeContainer from './WorkmodeContainer';
import SelectNewBackground from './SelectNewBackground';

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

export default function EditAbout() {
  const aboutInput = useRef(null);
  const [newBackground, setNewBackground] = useState({});
  const [checked, setChecked] = useState(false);
  const {
    data: aboutData,
    error: aboutError,
    loading: aboutLoading,
  } = useQuery(ABOUT_QUERY);
  // PHOTOS FOR BACKGROUND CHANGE
  const {
    data: backgroundPhotos,
    loading: possiblePhotosLoading,
    error: possiblePhotosError,
  } = useQuery(ALL_PHOTOS_QUERY);

  function handleChangeBackgroundToggle(e) {
    setChecked(e.target.checked);
  }

  function handleNewBackgroundSelect(e) {
    setNewBackground(e.target.dataset.photoid);
  }

  // UPDATE ABOUT PAGE
  const [
    updateAbout,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(UPDATE_ABOUT_MUTATION);

  async function handleSubmit(e) {
    e.preventDefault();
    const text = aboutInput.current.value;
    const newBackgroundId =
      newBackground || aboutData.about.background.image.id;
    await updateAbout({
      variables: {
        text,
        newBackgroundId,
      },
      refetchQueries: [{ query: ABOUT_QUERY }],
    });
    renderSuccessToast();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  if (aboutError || mutationError) return null;
  return (
    <WorkmodeContainer>
      <Error content={mutationError || aboutError} />
      <Loading size="big" content={mutationLoading || aboutLoading} />
      <form onSubmit={handleSubmit} disabled={mutationLoading}>
        <div>
          <label htmlFor="about-text">
            <div>About</div>
            <TextArea
              id="about-text"
              ref={aboutInput}
              disabled={aboutLoading}
              aria-busy={aboutLoading}
              defaultValue={aboutData?.about.text}
            />
          </label>
        </div>
        <div>
          <div>Current Background</div>
          <img
            alt="This will be your background"
            src={aboutData?.about.background.image.publicUrlTransformed}
          />
        </div>
        {/* { Maybe toggle menu open?} */}
        <ChangeBackgroundContainer open={checked}>
          <ChangeBackgroundToggle
            htmlFor="background-toggle"
            checked={checked}
            onInput={handleChangeBackgroundToggle}
          >
            Change Background
            <input id="background-toggle" type="checkbox" />
          </ChangeBackgroundToggle>
          <SelectNewBackground
            open={checked}
            handleNewBackgroundSelect={handleNewBackgroundSelect}
            newBackground={newBackground}
            backgroundPhotos={backgroundPhotos}
          />
        </ChangeBackgroundContainer>
        <Button loading={mutationLoading} type="submit">
          {mutationLoading ? 'Working...' : 'Save Changes'}
        </Button>
      </form>
    </WorkmodeContainer>
  );
}

EditAbout.propTypes = {};
