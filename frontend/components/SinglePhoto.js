import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import { PHOTO_QUERY } from '../graphql/queries';
import SVGLogo from './SVGLogo';

const SinglePhotoContainer = styled.div`
  height: calc(100vh - 110px);
  position: relative;
`;

const PhotoInfoContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const SingleImg = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
  line-height: 0;
  margin: 0;
  padding: 0 60px;
`;

const SinglePhotoName = styled.h2`
  color: var(--black);
  margin: 0;
  font-size: var(--fsm);
  text-align: left;
  line-height: 2em;
  align-self: center;
`;

const SingleImageDescription = styled.p`
  color: var(--black);
  margin: 0;
  font-size: var(--fss);
  text-align: right;
  line-height: 2em;
  align-self: center;
`;

const CloseButton = styled.div`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  top: 0;
  right: 0;
  position: absolute;
  cursor: pointer;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.5s ease;

  &:hover {
    background-color: var(--black);
  }

  svg {
    stroke: var(--black);
    width: 24px;
    height: 24px;
    transition: stroke 0.5s ease;
  }

  &:hover svg {
    stroke: var(--white);
  }
`;

export default function SinglePhoto({ id }) {
  const { data, loading, error } = useQuery(PHOTO_QUERY, {
    variables: {
      id,
    },
  });
  console.log('data in single photo is', data);

  if (loading) return <p>LOADING YOO</p>;
  if (error) return <p>There was an error. Ooops!</p>;
  // if (data === undefined) return null;
  return (
    <SinglePhotoContainer>
      <Head>
        <title>Megan Thompson | {data.photo.name}</title>
      </Head>
      <Link href={`/gallery/${data.photo.gallery.name}`}>
        <CloseButton aria-label="Close">
          <SVGLogo />
        </CloseButton>
      </Link>
      <SingleImg
        src={data.photo.image.publicUrlTransformed}
        alt={data.photo.altText}
      />
      <PhotoInfoContainer>
        <SinglePhotoName>{data.photo.name}</SinglePhotoName>
        <SingleImageDescription>
          {data.photo.description}
        </SingleImageDescription>
      </PhotoInfoContainer>
    </SinglePhotoContainer>
  );
}
