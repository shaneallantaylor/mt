import SortableList, { SortableItem } from 'react-easy-sort';
import styled from 'styled-components';
import { Button, NotPublishedBanner } from '../styles';

const SortableStlyes = styled.div`
  padding-top: 20px;
  .list {
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-template-rows: auto;
    grid-gap: 20px;
    align-items: center;
  }
`;

const SortGridItem = styled.div`
  max-width: fit-content;
  position: relative;
  overflow: hidden;
  user-select: none;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 5px;
  border: 2px solid gray;
  border-radius: 2px;
  background: var(--white);

  img {
    opacity: ${({ notPublished }) => (notPublished ? '0.4' : '1')};
    object-fit: cover;
    height: 100%;
    user-select: none;
  }
`;

const NameWrapper = styled.div`
  text-align: center;
  background: var(--white);
  width: 100%;

  p {
    color: black;
    margin: 0;
    font-size: 0.8rem;
  }
`;

const SortButtonContainer = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr;
  background: var(--white);
  padding-top: 10px;
`;

const RemoveButton = styled(Button)`
  background-color: #f34848;

  &:hover {
    background-color: #dc4141;
  }
`;

export default function EasySort({ photos, onSortEnd, handleRemovePhoto }) {
  if (!photos) return null;

  console.log('photos[0] is', photos[0]);
  return (
    <SortableStlyes>
      <SortableList
        onSortEnd={onSortEnd}
        className="list"
        draggedItemClassName="dragged"
      >
        {photos.map((photo, idx) => (
          <SortableItem key={photo?.id}>
            <SortGridItem notPublished={photo?.status !== 'PUBLISHED'}>
              <NameWrapper>
                <p>{photo?.name}</p>
              </NameWrapper>
              {photo?.status !== 'PUBLISHED' && <NotPublishedBanner />}
              <img
                src={photo?.image?.publicUrlTransformed}
                alt={`${photo?.name} Thumb`}
              />
              <SortButtonContainer>
                <Button
                  as="a"
                  type="button"
                  href={`/workmode/photo/${photo.id}`}
                >
                  Edit
                </Button>
                <RemoveButton
                  type="button"
                  data-idx={idx}
                  onClick={handleRemovePhoto}
                >
                  Remove
                </RemoveButton>
              </SortButtonContainer>
            </SortGridItem>
          </SortableItem>
        ))}
      </SortableList>
    </SortableStlyes>
  );
}
