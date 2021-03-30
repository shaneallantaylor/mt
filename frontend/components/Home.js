import styled from 'styled-components';

const HomeStyles = styled.div`
  background-image: url('//res.cloudinary.com/dk3ahfitr/image/upload/v1616893084/mt/bass-live_ttrd9s.jpg');
  width: 100vw;
  height: 100vh;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`;

export default function Home() {
  return <HomeStyles />;
}
