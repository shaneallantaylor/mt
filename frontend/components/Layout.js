import PropTypes from 'prop-types';

export default function Layout({ children }) {
  return (
    <div>
      <p>this is layout</p>
      <div>{children}</div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.any,
};
