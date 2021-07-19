import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

export const ALL_GALLERIES_QUERY = gql`
  query ALL_GALLERIES_QUERY {
    allGalleries(sortBy: name_ASC) {
      id
      name
    }
  }
`;

export default function SelectGallery({ handleOnChange }) {
  const { data, error, loading } = useQuery(ALL_GALLERIES_QUERY);

  if (loading) return <p>We are loading</p>;
  if (error) return <p>We are error!</p>;

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

SelectGallery.propTypes = {
  handleOnChange: PropTypes.func,
};
