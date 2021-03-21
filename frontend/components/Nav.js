import Link from 'next/link';

export default function Nav() {
  return (
    <nav>
      <Link href="/gallery/1">Gallery 1</Link>
      <Link href="/gallery/2">Gallery 2</Link>
      <Link href="/gallery/3">Gallery 3</Link>
      <Link href="/gallery/4">Gallery 4</Link>
      <Link href="/about">About</Link>
    </nav>
  );
}
