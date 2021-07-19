import styled from 'styled-components';
import Button from './Button';

const DestructiveButton = styled(Button)`
  background-color: #f34848;

  &:hover {
    background-color: #dc4141;
  }
`;

export default DestructiveButton;
