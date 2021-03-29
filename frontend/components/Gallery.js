import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const ALL_PHOTOS_QUERY = gql`
  query ALL_PHOTOS_QUERY {
    allPhotos {
      description
      name
      image {
        publicUrlTransformed
      }
    }
  }
`;

export default function Gallery() {
  const { data, error, loading } = useQuery(ALL_PHOTOS_QUERY);

  if (loading) return <h2>WE LOADING...</h2>;

  return (
    <div>
      {data.allPhotos.map((photo, idx) => (
        <div key={`photo-${idx}`}>
          <img src={photo.image.publicUrlTransformed} alt="hi" />
          <p>Name: {photo.name}</p>
          <p>Desc: {photo.description}</p>
        </div>
      ))}
    </div>
  );
}
