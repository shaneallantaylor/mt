import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Head from 'next/head';

const SINGLE_PHOTO_QUERY = gql`
  query SINGLE_PHOTO_QUERY($id: ID!) {
    Photo(where: { id: $id }) {
      name
      description
      altText
      image {
        publicUrlTransformed
      }
    }
  }
`;

export default function SinglePhoto({ id }) {
  const { data, loading, error } = useQuery(SINGLE_PHOTO_QUERY, {
    variables: {
      id,
    },
  });

  if (loading) return <p>LOADING YOO</p>;
  if (error) return <p>There was an error. Ooops!</p>;
  return (
    <div>
      <Head>
        <title>Megan Thompson | {data.Photo.name}</title>
      </Head>
      <p>I'm a single photo and my slug is {id}</p>
      <h2>{data.Photo.name}</h2>
      <img src={data.Photo.image.publicUrlTransformed} alt={data.Photo.name} />
    </div>
  );
}
