import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const NavContainer = styled.div`
  display: flex;
  justify-content: ${({ isSignIn }) => (isSignIn ? 'center' : 'space-between')};
  align-items: center;
  padding-top: 30px;

  a,
  a:hover {
    color: black;
    text-decoration: none;
  }
`;
const Headline = styled.h2`
  margin: 0;
  padding: 0;
`;

export default function WorkmodeNav({ pageTitle, isSignIn }) {
  return (
    <NavContainer isSignIn={isSignIn}>
      <Headline>{pageTitle}</Headline>
      {!isSignIn && <Link href="/workmode">←🧪🥼🧪</Link>}
    </NavContainer>
  );
}

WorkmodeNav.defaultProps = {
  isSignIn: false,
};

WorkmodeNav.propTypes = {
  pageTitle: PropTypes.string,
  isSignIn: PropTypes.bool,
};
