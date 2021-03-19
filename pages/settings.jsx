import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useCurrentUser } from '@/hooks/index';

const ProfileSection = () => {
  const [user, { mutate }] = useCurrentUser();
  const [isUpdating, setIsUpdating] = useState(false);
  const nameRef = useRef();
  const bioRef = useRef();
  const profilePictureRef = useRef();
  const [msg, setMsg] = useState({ message: '', isError: false });

  useEffect(() => {
    nameRef.current.value = user.name;
    bioRef.current.value = user.bio;
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isUpdating) return;
    setIsUpdating(true);
    const formData = new FormData();
    if (profilePictureRef.current.files.length === 1) {
      formData.append('profilePicture', profilePictureRef.current.files[0]);
    } else if (profilePictureRef.current.files.length >= 2) {
      for (let file of profilePictureRef.current.files) {
        formData.append('pics', file)
      }
    }
    formData.append('name', nameRef.current.value);
    formData.append('bio', bioRef.current.value);
    console.log('profilePictureRef.current.files IS', profilePictureRef.current.files);
    console.log('and now, just before the call to PATCH /api/user, this is the formData', formData);
    for (let pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
      if (pair[0] === 'profilePicture') {
        console.log(pair[1].name)

      }
    };
    const res = await fetch('/api/user', {
      method: 'PATCH',
      body: formData,
    });
    if (res.status === 200) {
      const userData = await res.json();
      console.log('userData in the response is', userData);
      mutate({
        user: {
          ...user,
          ...userData.user,
        },
      });
      setMsg({ message: 'Profile updated' });
    } else {
      setMsg({ message: await res.text(), isError: true });
    }
    setIsUpdating(false);
  };

  const handleSubmitPasswordChange = async (e) => {
    e.preventDefault();
    const body = {
      oldPassword: e.currentTarget.oldPassword.value,
      newPassword: e.currentTarget.newPassword.value,
    };
    e.currentTarget.oldPassword.value = '';
    e.currentTarget.newPassword.value = '';

    const res = await fetch('/api/user/password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
      setMsg({ message: 'Password updated' });
    } else {
      setMsg({ message: await res.text(), isError: true });
    }
  };

  async function sendVerificationEmail() {
    const res = await fetch('/api/user/email/verify', {
      method: 'POST',
    });
    if (res.status === 200) {
      setMsg({ message: 'An email has been sent to your mailbox' });
    } else {
      setMsg({ message: await res.text(), isError: true });
    }
  }

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <section>
        <h2>Edit Profile</h2>
        {msg.message ? <p style={{ color: msg.isError ? 'red' : '#0070f3', textAlign: 'center' }}>{msg.message}</p> : null}
        <form onSubmit={handleSubmit}>
          {!user.emailVerified ? (
            <p>
              Your email has not been verify.
              {' '}
              {/* eslint-disable-next-line */}
                <a role="button" onClick={sendVerificationEmail}>
                  Send verification email
                </a>
            </p>
          ) : null}
          <label htmlFor="name">
            Name
            <input
              required
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              ref={nameRef}
            />
          </label>
          <label htmlFor="bio">
            Bio
            <textarea
              id="bio"
              name="bio"
              type="text"
              placeholder="Bio"
              ref={bioRef}
            />
          </label>
          <label htmlFor="avatar">
            Profile picture
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/png, image/jpeg"
              ref={profilePictureRef}
              multiple
            />
          </label>
          <button disabled={isUpdating} type="submit">Save</button>
        </form>
        <form onSubmit={handleSubmitPasswordChange}>
          <label htmlFor="oldpassword">
            Old Password
            <input
              type="password"
              name="oldPassword"
              id="oldpassword"
              required
            />
          </label>
          <label htmlFor="newpassword">
            New Password
            <input
              type="password"
              name="newPassword"
              id="newpassword"
              required
            />
          </label>
          <button type="submit">Change Password</button>
        </form>
      </section>
    </>
  );
};

const SettingPage = () => {
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
      <h1>Settings</h1>
      <ProfileSection />
    </>
  );
};

export default SettingPage;