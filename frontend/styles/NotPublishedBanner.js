import styled from 'styled-components';

const Banner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  background: rgb(0 0 0 / 77%);

  p {
    font-size: 0.8rem;
    color: #ff7676;
    font-weight: 500;
    margin: 0;
    padding: 2px 100px;
    white-space: pre;
  }
`;

export default function NotPublishedBanner() {
  return (
    <Banner>
      <p>Not Published</p>
    </Banner>
  );
}
