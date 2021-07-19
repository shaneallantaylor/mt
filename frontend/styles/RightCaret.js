import styled from 'styled-components';
import WorkCard from './WorkCard';

const RightCaret = styled.div`
  height: 30px;
  width: 30px;
  position: absolute;
  top: 50%;
  right: 30px;
  border-top: 2px solid black;
  border-right: 2px solid black;
  transform: translateY(-50%) rotate(45deg) skew(10deg, 10deg);
  transition: 0.2s ease;

  ${WorkCard}:hover & {
    transform: translateY(-50%) rotate(45deg) skew(10deg, 10deg)
      translate(5px, -5px);
  }
`;

export default RightCaret;
