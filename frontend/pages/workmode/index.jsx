import React from 'react';
import Link from 'next/link';

const WorkmodePage = (props) => {
  console.log('workmode page props are', props);
  return (
    <>
      <h1 style={{ color: 'black' }}>Welcome. Let's get to work, shall we?</h1>
      <ul>
        <li>
          <Link
            style={{ color: 'black !important' }}
            href="/workmode/edit-gallery"
          >
            Edit Gallery
          </Link>
        </li>
        <li style={{ color: 'black' }}>Galleries</li>
        <li style={{ color: 'black' }}>Change my settings</li>
      </ul>
    </>
  );
};
export default WorkmodePage;
