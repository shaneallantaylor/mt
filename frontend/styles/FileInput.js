import styled from 'styled-components';

const FileInput = styled.input`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 1rem;
  cursor: pointer;

  &:focus-visible {
    outline: var(--primary) auto 1px;
    background: var(--white);
  }

  &::-webkit-file-upload-button {
    border: none;
    background: #b2d7e8;
    border-radius: 4px;
    cursor: pointer;
    padding: 10px;
  }
`;

export default FileInput;
