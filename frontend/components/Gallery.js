import { useQuery } from '@apollo/client';

import { ALL_PHOTOS_QUERY } from './Catalog';

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
