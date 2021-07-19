import { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { RadioOption, SelectRadios } from '../styles';

const BackgroundsTableHeader = styled.div`
  background: rgb(66 148 208 / 24%);
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 110px auto 140px;
  grid-gap: 20px;
  align-items: center;
  border-bottom: 1px solid var(--black);
  p {
    font-size: 0.8rem;
    margin: 0;
    display: inline-block;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  border-right: 1px solid var(--black);
  box-sizing: content-box;
  height: 100%;
  align-items: center;

  img {
    padding: 5px 0;
  }

  p {
    text-align: center;
    width: 100%;
    display: inline-block;
  }
`;

const Details = styled.div`
  display: flex;
`;

const BackgroundToggle = styled.div`
  margin-left: -10px;
  padding: 5px 0 5px 10px;
  height: 100%;
  border-left: 1px solid var(--black);
  p {
    font-size: 0.7rem;
  }
`;

export default function BackgroundsTable({
  photos,
  handleRadioChange,
  photosBeingUpdated,
  hydratePhotosToUpdate,
}) {
  useEffect(() => {
    hydratePhotosToUpdate(photos);
    // eslint-disable-next-line
  }, [photos]);

  const photoRows = photos?.map((photo) => (
    <Row key={`background-row-${photo.id}`}>
      <ImageContainer>
        <img
          style={{ maxHeight: '60px' }}
          alt={photo.altText}
          src={photo.image.publicUrlTransformed}
        />
      </ImageContainer>
      <Details>
        <p>
          <strong>Name: </strong>
          {photo.name} | <strong>Status: </strong>
          {photo.status?.toLowerCase()}
        </p>
      </Details>
      <BackgroundToggle>
        <SelectRadios>
          <RadioOption
            selected={!photosBeingUpdated[photo.id]?.backgroundImage}
            htmlFor={`background-nah-${photo.id}`}
          >
            Nope
            <input
              type="radio"
              id={`background-nah-${photo.id}`}
              name="background"
              value="nah"
              data-photoid={photo.id}
              onChange={handleRadioChange}
            />
          </RadioOption>
          <RadioOption
            selected={!!photosBeingUpdated[photo.id]?.backgroundImage}
            htmlFor={`background-yeah-${photo.id}`}
          >
            Sure
            <input
              type="radio"
              id={`background-yeah-${photo.id}`}
              name="background"
              value="yeah"
              data-photoid={photo.id}
              onChange={handleRadioChange}
            />
          </RadioOption>
        </SelectRadios>
      </BackgroundToggle>
    </Row>
  ));

  return (
    <div>
      <BackgroundsTableHeader>
        <Row>
          <ImageContainer>
            <p>Image</p>
          </ImageContainer>
          <Details>
            <p>Details</p>
          </Details>
          <BackgroundToggle>
            <p>Want this to be a homepage background image?</p>
          </BackgroundToggle>
        </Row>
      </BackgroundsTableHeader>
      {photoRows}
    </div>
  );
}

BackgroundsTable.propTypes = {
  photos: PropTypes.array,
  handleRadioChange: PropTypes.func,
  photosBeingUpdated: PropTypes.object,
  hydratePhotosToUpdate: PropTypes.func,
};
