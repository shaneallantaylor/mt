import SortableList, { SortableItem } from 'react-easy-sort';
import styled from 'styled-components';

const SortableStlyes = styled.div`
  .list {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto;
  }

  .item {
    max-width: fit-content;
    background: green;
    user-select: none;
    /* pointer-events: none; */
  }

  .dragged {
    background: red;
  }
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
            <div className="item">
              <img
                src={photo?.image?.publicUrlTransformed}
                alt={`${photo?.name} Thumb`}
              />
              <p>{photo?.name}</p>
              <button type="button" data-idx={idx} onClick={handleRemovePhoto}>
                Remove this photo
              </button>
            </div>
          </SortableItem>
        ))}
      </SortableList>
    </SortableStlyes>
  );
}
