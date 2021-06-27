import SortableList, { SortableItem } from 'react-easy-sort';
import styled from 'styled-components';
import Button from '../styles/Button';

const SortableStlyes = styled.div`
  .list {
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-template-rows: auto;
    grid-gap: 20px;
    align-items: center;
  }

  .dragged {
    background: red;
  }
`;

const SortGridItem = styled.div`
  max-width: fit-content;
  padding: 8px;
  overflow: hidden;
  border-radius: 30px;
  border: 2px solid #00000066;
  user-select: none;
  position: relative;
`;

const NameWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  background: hsl(0deg 0% 0% / 50%);
  width: 100%;

  p {
    color: white;
    margin: 0;
    font-size: 0.8rem;
  }
`;

const SortButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function EasySort({ photos, onSortEnd, handleRemovePhoto }) {
  if (!photos) return null;
  return (
    <SortableStlyes>
      <SortableList
        onSortEnd={onSortEnd}
        className="list"
        draggedItemClassName="dragged"
      >
        {photos.map((photo, idx) => (
          <SortableItem key={photo?.id}>
            <SortGridItem>
              <img
                src={photo?.image?.publicUrlTransformed}
                alt={`${photo?.name} Thumb`}
              />
              <NameWrapper>
                <p>{photo?.name}</p>
              </NameWrapper>
              <SortButtonContainer>
                <Button
                  as="a"
                  type="button"
                  href={`/workmode/photo/${photo.id}`}
                >
                  Edit
                </Button>
                <Button
                  type="button"
                  data-idx={idx}
                  onClick={handleRemovePhoto}
                >
                  Remove
                </Button>
              </SortButtonContainer>
            </SortGridItem>
          </SortableItem>
        ))}
      </SortableList>
    </SortableStlyes>
  );
}
