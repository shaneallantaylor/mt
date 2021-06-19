import styled from 'styled-components';
import Link from 'next/link';
import { useState } from 'react';

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

const PlaceHolder = styled.div`
  width: 100%;
  height: 100%;
  background: var(--gray);
`;

const PhotoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${(props) => (props.isLoaded ? 1 : 0)};
  transition: opacity 0.2s ease;
  background-color: var(--gray);
`;

export default function Photo({
  id,
  image,
  name,
  description,
  gallery,
  isLandscape = false,
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleOnLoad = () => {
    setIsLoaded(true);
  };

  return (
    <WrapperStandard
      key={id}
      isLandscape={isLandscape}
      imgsrc={image.publicUrlTransformed}
    >
      <Link href={`${gallery.name}/photo/${id}`}>
        <PlaceHolder>
          <PhotoImg
            isLoaded={isLoaded}
            onLoad={handleOnLoad}
            src={image.publicUrlTransformed}
            alt={name}
          />
        </PlaceHolder>
      </Link>
    </WrapperStandard>
  );
}
