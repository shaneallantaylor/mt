import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './Header';

const GlobalStyles = createGlobalStyle`
  html {
    --black: #000000;
    --white: #ffffff;
    --gray: #f0f0f0;
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
    font-family: sans-serif;
    color: var(--white);
  }

  a {
    color: var(--white);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  img {
    max-width: 100%;
  }
`;

const MainStyles = styled.main`
  max-width: 100vw;
  overflow-x: hidden;
`;

export default function Layout({ children }) {
  return (
    <>
      <GlobalStyles />
      <Header />
      <MainStyles>{children}</MainStyles>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.any,
};
