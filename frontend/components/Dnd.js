import styled from 'styled-components';
import {
  DragDropContext,
  Droppable,
  Draggable,
  resetServerContext,
} from 'react-beautiful-dnd';
import React from 'react';

const ListOfPhotos = styled.ul`
  color: black;
  margin: 0 auto;
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;

  li {
    max-width: 200px;
    outline: deepskyblue 1px solid;
  }
`;

export default function Dnd({ photos, handleOnDragEnd }) {
  resetServerContext();
  if (!photos) return <p>Waiting for Photos</p>;

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="photos">
        {(provided) => (
          <ListOfPhotos {...provided.droppableProps} ref={provided.innerRef}>
            {photos.map(({ id, name, image }, idx) => (
              <Draggable key={id} draggableId={id} index={idx}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div>
                      <img
                        src={image?.publicUrlTransformed}
                        alt={`${name} Thumb`}
                      />
                    </div>
                    <p>{name}</p>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ListOfPhotos>
        )}
      </Droppable>
    </DragDropContext>
  );
}
