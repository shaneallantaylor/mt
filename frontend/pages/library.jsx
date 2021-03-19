import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useCurrentUser } from '@/hooks/index';

const ProfileSection = () => {
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    fetch('/api/library')
      .then((res) => res.json())
      .then((data) => {
        const newPictures = [];
        data.resources.forEach((dataObj) => {
          newPictures.push(dataObj.secure_url);
        });
        setPictures(newPictures);
      });
  }, []);

  const imageList = pictures.map((url, idx) => (
    <img src={url} key={idx} alt="" />
  ));

  return (
    <>
      <Head>
        <title>This is the library!</title>
      </Head>
      <section>
        <h2>LIBRARY is:</h2>
        {imageList}
      </section>
    </>
  );
};

const LibraryPage = () => {
  const [user] = useCurrentUser();

  if (!user) {
    return (
      <>
        <p>Please sign in</p>
      </>
    );
  }
  return (
    <>
      <h1>Library</h1>
      <ProfileSection />
    </>
  );
};

export default LibraryPage;
