import styled from 'styled-components';

const Button = styled.button`
  align-items: center;
  border-style: solid;
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  justify-content: center;
  opacity: 0.65;
  outline: 0;
  position: relative;
  white-space: nowrap;
  background-color: var(--black);
  border-color: var(--gray);
  border-radius: 6px;
  border-width: 1px;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 500;
  height: 38px;
  padding-left: 16px;
  padding-right: 16px;
  transition: background-color 130ms, box-shadow 130ms, border-color 130ms,
    opacity 130ms;
`;

export default Button;
