import SortableList, { SortableItem } from 'react-easy-sort';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SortableStlyes = styled.div`
  .list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    grid-gap: 20px;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #8e8e8e;
  }

  .dragged {
    background: red;
  }
`;

const SortGridItem = styled.div`
  user-select: none;
  cursor: grab;

  &:active,
  &:focus {
    cursor: grabbing;
  }
`;

const NameWrapper = styled.div`
  text-align: center;
  background: var(--black);

  p {
    color: white;
    margin: 0;
    font-size: 0.8rem;
  }
`;

export default function EasySortNav({ navItems, onSortEnd }) {
  if (!navItems) return null;
  return (
    <SortableStlyes>
      <SortableList
        onSortEnd={onSortEnd}
        className="list"
        draggedItemClassName="dragged"
      >
        {navItems.map((navItem) => (
          <SortableItem key={navItem?.id}>
            <SortGridItem>
              <NameWrapper>
                <p>{navItem?.name}</p>
              </NameWrapper>
            </SortGridItem>
          </SortableItem>
        ))}
      </SortableList>
    </SortableStlyes>
  );
}

EasySortNav.propTypes = {
  navItems: PropTypes.array,
  onSortEnd: PropTypes.func,
};
