import PropTypes from 'prop-types';

export default function IndexPage({ children }) {
  return (
    <>
      <p>hey there</p>
      <div>{children}</div>
    </>
  );
}

IndexPage.propTypes = {
  children: PropTypes.any,
};
