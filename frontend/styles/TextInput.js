import styled from 'styled-components';

const TextInput = styled.input`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  height: 60px;
  padding: 10px;
  font-family: 'Noto Sans JP', sans-serif;
  resize: vertical;
  font-size: 0.8em;
  border: 2px solid #c7c7c7;
  border-radius: 4px;
  background: #f5f5f5;
  /* transition: all 0.3s ease; */

  &:focus-visible {
    outline: var(--primary) auto 1px;
    background: var(--white);
  }
`;

export default TextInput;
