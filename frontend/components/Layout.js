import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './Header';

const GlobalStyles = createGlobalStyle`
  html {
    --black: #000000;
    --white: #ffffff;
    --gray: #f0f0f0;
    --primary: #65b7d3;
    --fsl: 2rem;
    --fsxl: 2.5rem;
    --fsxxl: 3rem;
    --fsm: 1.2rem;
    --fss: 0.8rem;
    --fsxl: 0.5rem;
    --bs: 2px 3px 4px 0 rgba(0,0,0,0.3);
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
    font-family: 'Noto Sans JP', serif;
    color: var(--white);
  }

  a {
    color: red;
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
  padding: 20px;
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
