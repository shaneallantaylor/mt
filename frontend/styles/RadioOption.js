import styled from 'styled-components';

const RadioOption = styled.label`
  background: ${({ selected }) => (selected ? 'white' : 'transparent')};
  cursor: pointer;
  font-size: 1rem;
  padding: 0px 14px;
  border-radius: 4px;
  color: ${({ selected }) => (selected ? 'inherit' : '#989898')};

  input {
    border: 0px;
    clip: rect(0px, 0px, 0px, 0px);
    height: 1px;
    overflow: hidden;
    padding: 0px;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
`;

export default RadioOption;
