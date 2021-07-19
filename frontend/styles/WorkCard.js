import styled from 'styled-components';

const WorkCard = styled.div`
  cursor: pointer;
  position: relative;
  width: 100%;

  h6 {
    margin: 0;
    padding: 10px 20px;
    font-size: 1.6rem;
    ${({ gallery }) => (gallery ? 'height: 90px; line-height: 68px;' : 'red')}
  }

  p {
    font-size: 0.8rem;
    margin: 0;
    padding: 0 20px 20px;
    color: #5f5f5f;
  }

  &:after {
    content: '${({ published }) =>
      published ? 'Published' : 'Not Published'}';
    position: absolute;
    height: 15px;
    width: 80%;
    border-top-right-radius: 70px;
    bottom: 0;
    font-size: 0.5rem;
    background: ${({ published }) => (published ? '#d9f1d9' : '#ffd2d2')};
    margin: 0;
    padding-left: 8px;
    display: ${({ gallery }) => (gallery ? 'block' : 'none')};
  }
`;

export default WorkCard;
