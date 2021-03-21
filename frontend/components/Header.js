import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav';

const Logo = styled.h1`
  color: red;
  background: green;
`;

export default function Header() {
  return (
    <header>
      <Logo>
        <Link href="/">Megan Thompson</Link>
      </Logo>
      <Nav />
    </header>
  );
}
