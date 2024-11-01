// components/ProfileCard.tsx
import React from 'react';

const ProfileCard = () => {
  return (
    <div className="bg-white p-4 shadow-md rounded-md w-1/4 text-center">
      <img src="/header/anna-james.jpg" alt="User" className="mx-auto rounded-full w-24 h-24" />
      <h2 className="mt-2 text-lg font-semibold">Anna James</h2>
      <p className="text-gray-500">HR Manager, ABC Industries</p>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">Message</button>
    </div>
  );
};

export default ProfileCard;
