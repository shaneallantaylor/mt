import Link from 'next/link';
import styled from 'styled-components';
import Button from '../styles/Button';

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

const DeleteButton = styled(Button)`
  background: red;
  height: 30px;
  width: 80px;
  margin-top: 4px;
`;

const EditButton = styled(Button)`
  height: 30px;
  width: 80px;
  background: var(--primary);
`;

export default function PhotoCards({ allPhotos }) {
  console.log('allPhotos', allPhotos);
  const photos = allPhotos?.allPhotos || [];
  const photoCards = photos.map((photo) => (
    <Card>
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
            <EditButton>Edit</EditButton>
          </Link>
          <DeleteButton>Delete</DeleteButton>
        </ActionsContainer>
      </TextContainer>
    </Card>
  ));
  if (!allPhotos) return null;
  return <CardsContainer>{photoCards}</CardsContainer>;
}
