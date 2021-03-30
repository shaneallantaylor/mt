import Link from 'next/link';
import styled from 'styled-components';

const NavStyles = styled.nav`
  a {
    margin: 0 20px;
  }
`;

export default function Nav() {
  return (
    <NavStyles>
      <Link href="/gallery/1">Gallery 1</Link>
      <Link href="/gallery/2">Gallery 2</Link>
      <Link href="/gallery/3">Gallery 3</Link>
      <Link href="/gallery/4">Gallery 4</Link>
      <Link href="/about">About</Link>
    </NavStyles>
  );
}
