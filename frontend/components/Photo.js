import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const loading = keyframes`
	0% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`;

const WrapperStandard = styled.figure`
  margin: 0;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  line-height: 0;
  opacity: ${({ isLoaded }) => (isLoaded ? 1 : 0)};
  transition: opacity 0.6s ease-out;
`;

const ImageContainer = styled.div`
  position: relative;
  height: 0;
  padding-top: ${(340 / 227) * 100}%;
  /* background: linear-gradient(-270deg, #ee7752, #e73c7e, #23a6d5, #23d5ab); */
  background: linear-gradient(
    270deg,
    #e6e6e6,
    #e6e6e6,
    #e6e6e6,
    #fbfbfb,
    #e6e6e6,
    #e6e6e6,
    #e6e6e6
  );
  background-size: 400% 400%;
  animation: ${loading} 4s ease forwards infinite;
`;

export default function Photo({ id, image, name, gallery }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleOnLoad = () => {
    setIsLoaded(true);
  };

  return (
    <WrapperStandard>
      <Link href={`${gallery.name}/photo/${id}`}>
        <ImageContainer>
          <ImageWrapper isLoaded={isLoaded}>
            <Image
              // layout="fill"
              height="1200"
              width="800"
              objectFit="cover"
              src={image.publicUrlTransformed}
              alt={name}
              onLoad={handleOnLoad}
              unoptimized
            />
          </ImageWrapper>
        </ImageContainer>
      </Link>
    </WrapperStandard>
  );
}
