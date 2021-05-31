import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const ALL_GALLERIES_QUERY = gql`
  query ALL_GALLERIES_QUERY {
    allGalleries(sortBy: name_ASC) {
      id
      name
    }
  }
`;

export default function SelectGallery({ handleOnChange }) {
  // on page load, get all the galleries
  const { data, error, loading } = useQuery(ALL_GALLERIES_QUERY);

  if (loading) return <p>We are loading</p>;
  if (error) return <p>We are error!</p>;
  // handle the selection of a gallery
  // and feed that to the DND list

  return (
    <div>
      <label htmlFor="gallery">Which gallery would you like to edit?</label>
      <select onChange={handleOnChange} name="gallery" id="gallery">
        {data.allGalleries.map((gallery) => (
          <option key={gallery.id} value={`${gallery.name}`}>
            {gallery.name}
          </option>
        ))}
      </select>
    </div>
  );
}
