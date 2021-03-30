import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav';

const HeaderStyles = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  background: rgb(210 210 210 / 30%);
`;

const Logo = styled.h1`
  margin: 0;
`;

export default function Header() {
  return (
    <HeaderStyles>
      <Logo>
        <Link href="/">Megan Thompson</Link>
      </Logo>
      <Nav />
    </HeaderStyles>
  );
}
