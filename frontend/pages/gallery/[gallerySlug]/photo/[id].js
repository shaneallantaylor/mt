import PropTypes from 'prop-types';
import SinglePhoto from '../../../../components/SinglePhoto';

export default function SinglePhotoPage({ query }) {
  return <SinglePhoto id={query.id} />;
}

SinglePhotoPage.propTypes = {
  query: PropTypes.object,
};
