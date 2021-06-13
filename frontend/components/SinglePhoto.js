import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import { PHOTO_QUERY } from '../graphql/queries';

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
  background: red;
  width: 40px;
  height: 40px;
  top: 0;
  right: 0;
  position: absolute;
  cursor: pointer;

  svg {
    height: 100%;
    width: 100%;
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
        <CloseButton>
          <svg
            viewBox="0 0 40 40"
            version="1.1"
            width="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="1"
              y1="11"
              x2="11"
              y2="1"
              stroke="black"
              strokeWidth="2"
            />
            <line
              x1="1"
              y1="1"
              x2="11"
              y2="11"
              stroke="black"
              strokeWidth="2"
            />
          </svg>
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
