import { useQuery } from '@apollo/client';
import styled from 'styled-components';

import { ALL_PHOTOS_QUERY } from './Catalog';

const GalleryStyles = styled.section`
  position: relative;

  ul {
    width: 100vw;
    margin: 0;
    padding: 0;
    list-style: none;
    columns: 4 300px;

    li {
      position: relative;

      .details {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
  }
`;

const GalleryFooterStyles = styled.div`
  background: rgb(0, 0, 0);
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(209, 209, 209, 1) 65%,
    rgba(255, 255, 255, 1) 100%
  );
  width: 100%;
  height: 1000px;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: -1;
`;

export default function Gallery() {
  const { data, error, loading } = useQuery(ALL_PHOTOS_QUERY);

  if (loading) return <h2>WE LOADING...</h2>;

  return (
    <GalleryStyles>
      <ul>
        {data.allPhotos.map((photo) => (
          <li key={photo.id}>
            <img src={photo.image.publicUrlTransformed} alt={photo.name} />
            <div className="details">
              <p className="name">Name: {photo.name}</p>
              <p className="desc">Desc: {photo.description}</p>
            </div>
          </li>
        ))}
      </ul>
      <GalleryFooterStyles />
    </GalleryStyles>
  );
}
