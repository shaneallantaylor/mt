import PropTypes from 'prop-types';
import { createGlobalStyle } from 'styled-components';
import Header from './Header';

const GlobalStyles = createGlobalStyle`
  html {
    --black: #000000;
    --white: #ffffff;
    --bs: 0 12px 24px 0 rgba(0, 0, 0, 0.9);
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
  }

  a {
    color: var(--black);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

export default function Layout({ children }) {
  return (
    <div>
      <GlobalStyles />
      <Header />
      <p>this is layout</p>
      <div>{children}</div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.any,
};
