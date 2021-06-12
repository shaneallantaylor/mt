import { useQuery } from '@apollo/client';

import Search from './Search';
import CatalogStyles from './styles/CatalogStyles';
import { ALL_PHOTOS_QUERY } from '../graphql/queries';

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
