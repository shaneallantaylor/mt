import Link from 'next/link';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import {
  ALL_GALLERIES_QUERY,
  ALL_PUBLISHED_GALLERIES_QUERY,
} from '../graphql/queries';

const NavStyles = styled.nav`
  width: 100%;
  overflow: hidden;
  position: relative;

  .fader {
    display: block;
    height: 100%;
    width: 25px;
    background: -webkit-linear-gradient( 
0deg ,rgba(25,25,25,0),rgb(25 25 25));
    position: absolute;
    top: 0;
    right: -2px;
  }

  }
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    gap: 20px;
    margin: 10px 0 0px;
    overflow-x: scroll;

    li {
      white-space: pre;
    }
    li:last-of-type {
      padding-right: 14px;
    }
  }
`;

export default function Nav() {
  const { data, error, loading } = useQuery(ALL_GALLERIES_QUERY);
  if (loading) return <h2>WE LOADING...</h2>;
  if (error) return <h2>Oh no erro</h2>;

  return (
    <NavStyles>
      <div className="fader" />
      <ul>
        {data.allGalleries.map((gallery) => (
          <Link key={gallery.id} href={`/gallery/${gallery.name}`}>
            <li>{gallery.name}</li>
          </Link>
        ))}
        <Link href="/about">
          <li>About</li>
        </Link>
      </ul>
    </NavStyles>
  );
}
