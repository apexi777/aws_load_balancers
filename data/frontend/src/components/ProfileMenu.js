// src/pages/ProfilePage.js
// Not used
import React from 'react';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      {user ? <p>Welcome, {user.email}!</p> : <p>You are not logged in.</p>}
    </div>
  );
};

export default ProfilePage;
