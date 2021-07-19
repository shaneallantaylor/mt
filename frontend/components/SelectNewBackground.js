import styled from 'styled-components';
import PropTypes from 'prop-types';

const NewBackgroundContainer = styled.div`
  max-height: ${(props) => (props.open ? '20000px' : '1px')};
  overflow: hidden;
  transition: max-height 0.5s ease;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 1fr;
  grid-auto-flow: dense;
  grid-gap: 20px;
  justify-content: center;
  padding: 0px 4px;
  margin: 0px 4px;
`;

const StyledLabel = styled.label`
  cursor: pointer;
  position: relative;
  z-index: 2;

  &:after {
    content: '✔';
    pointer-events: none;
    color: white;
    height: 40px;
    width: 40px;
    line-height: 27px;
    text-align: right;
    padding-right: 5px;
    background: var(--primary);
    border-bottom-left-radius: 40px;
    position: absolute;
    top: 0;
    right: 0;
    opacity: ${(props) => (props.checked ? '1' : '0')};
    transition: opacity 0.4s ease;
  }

  img {
    border: solid 2px ${(props) => (props.checked ? 'black' : 'white')};
    opacity: ${(props) => (props.checked ? '0.7' : '1')};
    height: 260px;
    width: 100%;
    object-fit: cover;
    object-position: top;
  }
`;

const StyledInput = styled.input`
  border: 0px;
  clip: rect(0px, 0px, 0px, 0px);
  height: 1px;
  overflow: hidden;
  padding: 0px;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export default function SelectNewBackground({
  handleNewBackgroundSelect,
  newBackground,
  backgroundPhotos,
  open,
}) {
  if (!backgroundPhotos) return <div />;
  return (
    <NewBackgroundContainer open={open}>
      <p>Pick a photo, hotshot:</p>
      <GridContainer>
        {backgroundPhotos.allPhotos.map((photo) => (
          <StyledLabel
            key={`label-${photo.id}`}
            checked={newBackground === photo.id}
            htmlFor={photo.id}
            imageSrc={photo.image?.publicUrlTransformed}
          >
            <img alt={photo.name} src={photo.image?.publicUrlTransformed} />
            <StyledInput
              onInput={handleNewBackgroundSelect}
              id={photo.id}
              data-photoid={photo.id}
              type="radio"
            />
          </StyledLabel>
        ))}
      </GridContainer>
    </NewBackgroundContainer>
  );
}

SelectNewBackground.propTypes = {
  handleNewBackgroundSelect: PropTypes.func,
  newBackground: PropTypes.string,
  backgroundPhotos: PropTypes.object,
  open: PropTypes.bool,
};
