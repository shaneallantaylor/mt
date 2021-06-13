// External
import Link from 'next/link';
import styled from 'styled-components';

// Internal
import Nav from './Nav';
import breakpoints from '../theme/breakpoints';

const HeaderStyles = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
  background: var(--headerbg);

  @media ${breakpoints.tabLand} {
    flex-direction: row;
  }
`;

const Logo = styled.h1`
  display: inherit;
  margin: 10px 0 0 0;
  line-height: 0;
  max-height: 45px;
  img {
    object-fit: scale-down;
  }

  @media ${breakpoints.tabLand} {
    margin: 10px 0 10px 0;
  }
`;

export default function Header() {
  return (
    <HeaderStyles>
      <Logo>
        <Link href="/">
          <img src="/mt-white.png" alt="Megan Thompson" />
        </Link>
      </Logo>
      <Nav />
    </HeaderStyles>
  );
}
