import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledLabel = styled.label`
  display: inline-block;
  border-radius: 4px;
  font-size: 0.875rem;
  padding-left: 12px;
  padding-right: 12px;
  padding-bottom: 8px;
  padding-top: 8px;
  box-sizing: border-box;
  cursor: pointer;
  font-weight: 500;
  text-align: center;
  position: relative;
  z-index: 2;
  outline: solid red ${(props) => (props.checked ? '4px' : '0px')};

  img {
    max-width: 150px;
    max-height: 150px;
  }
`;

const StyledCheckbox = styled.input`
  border: 0px;
  clip: rect(0px, 0px, 0px, 0px);
  height: 1px;
  overflow: hidden;
  padding: 0px;
  position: absolute;
  white-space: nowrap;
  width: 1px;

  &:hover {
    outline: 4px solid green;
  }
`;

export default function AddPhotosToGallery({
  handleAddPhotos,
  handleCheckboxInputChange,
  checkboxes,
  possiblePhotos,
}) {
  if (!possiblePhotos) return null;
  return (
    <div>
      <p>Select these photos:</p>
      <div>
        {possiblePhotos.possiblePhotos.map((photo) => (
          <StyledLabel key={`label-${photo.id}`} checked={checkboxes[photo.id]}>
            <img alt={photo.name} src={photo.image?.publicUrlTransformed} />
            <StyledCheckbox
              onInput={handleCheckboxInputChange}
              id={photo.id}
              data-photo={JSON.stringify(photo)}
              type="checkbox"
            />
          </StyledLabel>
        ))}
      </div>
      <button type="button" onClick={handleAddPhotos}>
        Add These Photos
      </button>
    </div>
  );
}

AddPhotosToGallery.propTypes = {
  handleAddPhotos: PropTypes.func,
  handleCheckboxInputChange: PropTypes.func,
  checkboxes: PropTypes.object,
  possiblePhotos: PropTypes.array,
};
