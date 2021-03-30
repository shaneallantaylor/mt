import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

import Search from './Search';
import CatalogStyles from './styles/CatalogStyles';

export const ALL_PHOTOS_QUERY = gql`
  query ALL_PHOTOS_QUERY {
    allPhotos {
      id
      description
      name
      image {
        publicUrlTransformed
      }
    }
  }
`;

export default function Catalog() {
  const { data, error, loading } = useQuery(ALL_PHOTOS_QUERY);
  if (loading) return <h2>WE LOADING...</h2>;
  if (error) return <h2>Oh no erro</h2>;
  return (
    <div>
      <Search />
      <CatalogStyles>
        {data.allPhotos.map((photo) => (
          <div key={photo.id}>
            <img src={photo.image.publicUrlTransformed} alt="hi" />
            <p>Name: {photo.name}</p>
            <p>Desc: {photo.description}</p>
          </div>
        ))}
      </CatalogStyles>
    </div>
  );
}
