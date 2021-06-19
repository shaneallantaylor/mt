import Link from 'next/link';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  ALL_GALLERIES_QUERY,
  ALL_PUBLISHED_GALLERIES_QUERY,
} from '../graphql/queries';
import breakpoints from '../theme/breakpoints';

const NavStyles = styled.nav`
  width: 100%;
  overflow: hidden;
  position: relative;



  .fader {
    display: block;
    height: 100%;
    width: 25px;
    background: -webkit-linear-gradient(0deg ,rgba(0,0,0,0), var(--headerbg));
    position: absolute;
    top: 0;
    right: -2px;
    z-index: 1;

    @media ${breakpoints.tabPort} {
      display: none;
    }

  }

  }
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    gap: 20px;
    margin: 10px 0 0px;
    overflow-x: scroll;
    @media ${breakpoints.tabPort} {
      justify-content: space-around;
    }
    
    @media ${breakpoints.tabLand} {
      justify-content: flex-end;
      gap: 30px;
    }

    li {
      white-space: pre;
      font-size: var(--fsm);
      position: relative;
      transition: 0.2s ease;
      cursor: pointer;

      &:after {
        transition: 0.2s ease;
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        background: var(--primary);
        height: 2px;
        width: 0%;
        border-radius: 20px;
      }

      &.active {
        color: var(--primary);
      }

      &.active:after {

          width: 100%;
      }

    }
    
    li:last-of-type {
      padding-right: 14px;
    }
  }
`;

export default function Nav() {
  const { data, error, loading } = useQuery(ALL_GALLERIES_QUERY);
  const { query } = useRouter();
  if (loading) return <h2>WE LOADING...</h2>;
  if (error) return <h2>Oh no erro</h2>;

  return (
    <NavStyles>
      <div className="fader" />
      <ul>
        {data.allGalleries.map((gallery) => (
          <Link key={gallery.id} href={`/gallery/${gallery.name}`}>
            <li
              className={query.gallerySlug === gallery.name ? 'active' : null}
            >
              {gallery.name}
            </li>
          </Link>
        ))}
        <Link href="/about">
          <li>About</li>
        </Link>
      </ul>
    </NavStyles>
  );
}
