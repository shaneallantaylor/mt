import { useMutation, useQuery } from '@apollo/client';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import Button from '../styles/Button';
import { UPDATE_ABOUT_MUTATION } from '../graphql/mutations';
import { ABOUT_QUERY, ALL_PHOTOS_QUERY } from '../graphql/queries';
import { TextArea, WorkmodeContainer } from '../styles';
import { renderSuccessToast } from './toasts';
import SelectNewBackground from './SelectNewBackground';
import WorkmodeNav from './WorkmodeNav';

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
  const [newBackground, setNewBackground] = useState('');
  const [checked, setChecked] = useState(false);
  const {
    data: aboutData,
    error: aboutError,
    loading: aboutLoading,
  } = useQuery(ABOUT_QUERY);

  const { data: backgroundPhotos } = useQuery(ALL_PHOTOS_QUERY);

  function handleChangeBackgroundToggle(e) {
    setChecked(e.target.checked);
  }

  function handleNewBackgroundSelect(e) {
    setNewBackground(e.target.dataset.photoid);
  }

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (aboutError || mutationError) return null;
  return (
    <WorkmodeContainer>
      <WorkmodeNav pageTitle="Edit About" />
      <form onSubmit={handleSubmit} disabled={mutationLoading}>
        <div>
          <label htmlFor="about-text">
            <div>The words:</div>
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
        <Button loading={mutationLoading.toString()} type="submit">
          {mutationLoading ? 'Working...' : 'Save Changes'}
        </Button>
      </form>
    </WorkmodeContainer>
  );
}
