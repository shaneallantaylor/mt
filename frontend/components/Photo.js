import styled from 'styled-components';

const Wrapper = styled.figure`
  margin: 0;
  position: relative;
  /* outline: 2px solid deeppink; */
  line-height: 0px;
  overflow: hidden;
  border-top-left-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: var(--bs);

  ${(props) => (props.isLandscape ? 'grid-column: span 2' : '')}
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
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

export default function Photo({
  id,
  image,
  name,
  description,
  isLandscape = false,
}) {
  return (
    <Wrapper key={id} isLandscape={isLandscape}>
      <PhotoImg src={image.publicUrlTransformed} alt={name} />
      <TextWrapper className="details">
        <p className="name">Name: {name}</p>
        <p className="desc">Desc: {description}</p>
      </TextWrapper>
    </Wrapper>
  );
}
