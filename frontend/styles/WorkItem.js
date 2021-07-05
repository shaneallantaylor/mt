import styled from 'styled-components';

const WorkItem = styled.li`
  display: flex;
  justify-content: start;
  align-items: center;
  color: black;
  background: white;
  border: 1px solid #e6e6e6;
  outline: 0px inset black;
  box-shadow: var(--bs);
  border-radius: 3px;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: var(--black);
  }
`;

export default WorkItem;
