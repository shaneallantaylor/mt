import Link from 'next/link';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { ALL_PUBLISHED_GALLERIES_QUERY } from '../graphql/queries';

const NavStyles = styled.nav`
  a {
    margin: 0 20px;
  }
`;

export default function Nav() {
  const { data, error, loading } = useQuery(ALL_PUBLISHED_GALLERIES_QUERY);
  if (loading) return <h2>WE LOADING...</h2>;
  if (error) return <h2>Oh no erro</h2>;

  return (
    <NavStyles>
      {data.allGalleries.map((gallery) => (
        <Link key={gallery.id} href={`/gallery/${gallery.name}`}>
          {gallery.name}
        </Link>
      ))}
      <Link href="/about">About</Link>
    </NavStyles>
  );
}
