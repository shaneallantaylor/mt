import styled from 'styled-components';
import Link from 'next/link';

const WrapperBackground = styled.figure`
  margin: 0;
  position: relative;
  background-image: url(${(props) => props.imgsrc});
  background-size: cover;
  background-position: center;
  padding: 1rem;
  /* outline: 2px solid deeppink; */
  line-height: 0px;
  overflow: hidden;
  /* border-top-left-radius: 20px; */
  /* border-bottom-right-radius: 20px; */
  /* box-shadow: var(--bs); */
  /* display: grid; */

  &:before {
    content: '';
    padding-bottom: 100%;
    display: block;
    /* grid-area: 1 / 1 / 2 / 2; */
  }

  ${(props) => (props.isLandscape ? 'grid-column: span 2' : '')}
`;

const WrapperStandard = styled.figure`
  margin: 0;
  position: relative;
  /* padding: 1rem; */
  /* outline: 2px solid deeppink; */
  line-height: 0px;
  overflow: hidden;
  /* border-top-left-radius: 20px; */
  /* border-bottom-right-radius: 20px; */
  /* box-shadow: var(--bs); */
  cursor: pointer;
`;

const TextWrapper = styled.figcaption`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: hsl(0, 0%, 0%, 0.4);
  /* display: flex; */
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 1;
  transition: opacity 0.4s ease;

  &:hover {
    opacity: 1;
  }
`;

const PhotoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default function Photo({
  id,
  image,
  name,
  description,
  gallery,
  isLandscape = false,
}) {
  return (
    <WrapperStandard
      key={id}
      isLandscape={isLandscape}
      imgsrc={image.publicUrlTransformed}
    >
      <Link href={`${gallery.name}/photo/${id}`}>
        <PhotoImg src={image.publicUrlTransformed} alt={name} />
      </Link>
    </WrapperStandard>
  );
}
