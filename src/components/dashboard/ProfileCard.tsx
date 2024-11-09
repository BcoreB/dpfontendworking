import React from 'react';

// Define the structure of an individual employee profile
type EmployeeProfile = {
  name: string;
  position: string;
  image: string;
  doj: string;
  posts: number;
  followers: string;
  following: number;
};

// Define the props for the ProfileCard component
interface ProfileCardProps {
  employeeCode: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ employeeCode }) => {
  // Define employee profiles with type checking
  const employeeProfiles: Record<string, EmployeeProfile> = {
    "12345": {
      name: "Anna James",
      position: "HR Manager",
      image: "/header/anna-james.jpg",
      doj: "07/08/2001",
      posts: 17,
      followers: "9.7K",
      following: 434,
    },
    "67890": {
      name: "John Doe",
      position: "Software Engineer",
      image: "/header/john-doe.jpeg",
      doj: "12/11/1995",
      posts: 24,
      followers: "8.2K",
      following: 520,
    },
    // Add more profiles as needed
  };

  // Select profile based on employeeCode, or use a default profile if not found
  const profile = employeeProfiles[employeeCode] || {
    name: "Unknown",
    position: "N/A",
    image: "/header/default.jpg",
    doj: "N/A",
    posts: 0,
    followers: "0",
    following: 0,
  };

  const { name, position,doj, image, posts, followers, following } = profile;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-96 mx-auto">
      {/* Cover Image */}
      <div className="h-24 bg-gradient-to-r from-orange-300 to-purple-500"></div>
      
      {/* Profile Image */}
      <div className="relative -mt-12 flex justify-center">
        <img
          src={image}
          alt={name}
          className="w-24 h-24 rounded-full border-4 border-white"
        />
      </div>
      
      {/* Name and Position */}
      <div className="text-center mt-4">
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-gray-500">{position}</p>
        <p className="text-gray-500 py-4">{doj}</p>
      </div>

      {/* Stats Section */}
      {/* <div className="flex justify-around mt-6 mb-4 text-sm">
        <div className="text-center">
          <p className="font-semibold">{posts}</p>
          <p className="text-gray-500">Posts</p>
        </div>
        <div className="text-center">
          <p className="font-semibold">{followers}</p>
          <p className="text-gray-500">Followers</p>
        </div>
        <div className="text-center">
          <p className="font-semibold">{following}</p>
          <p className="text-gray-500">Following</p>
        </div>
      </div> */}
    </div>
  );
};

export default ProfileCard;
