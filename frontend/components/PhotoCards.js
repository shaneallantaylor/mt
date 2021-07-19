import { useMutation } from '@apollo/client';
import Link from 'next/link';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { DELETE_PHOTO_MUTATION } from '../graphql/mutations';
import { ALL_PHOTOS_QUERY } from '../graphql/queries';
import { DestructiveButton, Button } from '../styles';
import { renderSuccessToast } from './toasts';

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
`;

const Card = styled.div`
  background: var(--gray);
  width: 400px;
  height: 400px;
  border-radius: 4px;
  justify-self: center;
  position: relative;
  padding-bottom: 20px;
  border: 5px solid ${({ published }) => (published ? '#d9f1d9' : '#ffd2d2')};

  &:after {
    content: '${({ published }) =>
      published ? 'Published' : 'Not Published'}';
    position: absolute;
    height: 15px;
    width: 80%;
    border-top-right-radius: 70px;
    bottom: 0;
    font-size: 0.5rem;
    background: ${({ published }) => (published ? '#d9f1d9' : '#ffd2d2')};
    margin: 0;
    padding-left: 8px;
  }
`;

const ImageContainer = styled.div`
  height: 80%;
  overflow: hidden;
  position: relative;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: initial;
  }
`;

const TextContainer = styled.div`
  border-top: 2px solid var(--gray);
  color: var(--black);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  max-height: 70px;
  padding: 10px;
`;

const NameAndAlt = styled.p`
  font-size: 0.8rem;
  font-weight: bold;
  margin: 0.5em 0;
  span {
    font-size: 0.6rem;
    font-weight: normal;
    color: #b1b1b1;
  }
`;

const Description = styled.p`
  font-size: 0.5rem;
  margin: 0.5em 0;
`;

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  align-items: flex-end;
  margin-left: 50px;
`;

export default function PhotoCards({ allPhotos }) {
  const [
    deletePhoto,
    { loading: deleteLoading, error: deleteError },
  ] = useMutation(DELETE_PHOTO_MUTATION);

  const photos = allPhotos?.allPhotos || [];

  async function handleDeletePhoto(e) {
    e.preventDefault();
    const photoId = e.target.dataset.photoid;

    // Get the photo ID
    if (window.confirm('Are you sure you want to delete the photo?')) {
      await deletePhoto({
        variables: {
          id: photoId,
        },
        refetchQueries: [{ query: ALL_PHOTOS_QUERY }],
      });
      renderSuccessToast();
    } else {
      console.log('NVM, doing nothing');
    }
  }

  const photoCards = photos.map((photo) => (
    <Card
      key={`photo-card-${photo.id}`}
      published={photo.status === 'PUBLISHED'}
    >
      <ImageContainer>
        <img src={photo.image.publicUrlTransformed} alt={photo.altText} />
      </ImageContainer>
      <TextContainer>
        <div>
          <NameAndAlt>
            {photo.name} <span>{photo.altText}</span>
          </NameAndAlt>
          <Description>{photo.description}</Description>
        </div>
        <ActionsContainer>
          <Link href={`/workmode/photo/${photo.id}`}>
            <Button style={{ height: '30px', marginBottom: '10px' }}>
              Edit
            </Button>
          </Link>
          <DestructiveButton
            onClick={handleDeletePhoto}
            style={{ height: '25px', width: '70px' }}
            data-photoid={photo.id}
          >
            Delete
          </DestructiveButton>
        </ActionsContainer>
      </TextContainer>
    </Card>
  ));
  if (!allPhotos) return null;
  return <CardsContainer>{photoCards}</CardsContainer>;
}

PhotoCards.propTypes = {
  allPhotos: PropTypes.array,
};
