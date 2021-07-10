import styled from 'styled-components';
import { Button } from '../styles';

const AddPhotosContainer = styled.div`
  max-height: ${(props) => (props.open ? '20000px' : '1px')};
  overflow: hidden;
  transition: max-height 0.5s ease;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
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

export default function SelectPhotosToAddToGallery({
  handleSelect,
  selectedPhotos,
  possiblePhotos,
  open,
  handleAddPhotos,
}) {
  console.log('selectedPhotos is', selectedPhotos);
  if (!possiblePhotos) return <div />;
  return (
    <AddPhotosContainer open={open}>
      <GridContainer>
        {possiblePhotos.possiblePhotos.map((photo) => (
          <StyledLabel
            key={`label-${photo.id}`}
            checked={selectedPhotos[photo.id]?.checked}
            htmlFor={photo.id}
            imageSrc={photo.image?.publicUrlTransformed}
          >
            <img alt={photo.name} src={photo.image?.publicUrlTransformed} />
            <StyledInput
              onInput={handleSelect}
              id={photo.id}
              data-photo={JSON.stringify(photo)}
              type="checkbox"
            />
          </StyledLabel>
        ))}
      </GridContainer>
      <Button onClick={handleAddPhotos}>Add These Photos</Button>
    </AddPhotosContainer>
  );
}
