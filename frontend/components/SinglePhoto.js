import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Head from 'next/head';
import { PHOTO_QUERY } from '../graphql/queries';

export default function SinglePhoto({ id }) {
  const { data, loading, error } = useQuery(PHOTO_QUERY, {
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
