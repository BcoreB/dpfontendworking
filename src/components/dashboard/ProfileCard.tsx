// components/ProfileCard.tsx
import React from 'react';

const ProfileCard = () => {
  return (
    <div className="bg-white  p-4 shadow-md rounded-md w-10/12 md:w-2/6 text-center">
      <img src="/header/anna-james.jpg" alt="User" className="mx-auto rounded-full w-24 h-24" />
      <h2 className="mt-2 text-lg font-semibold">Anna James</h2>
      <p className="text-gray-500">HR Manager, ABC Industries</p>
      <p>07/08/2001</p>
    </div>
  );
};

export default ProfileCard;
