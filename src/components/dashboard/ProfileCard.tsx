import React from 'react';

// Define the structure of an individual employee profile
type EmployeeProfile = {
  name: string;
  position: string;
  image: string;
  dob: string;
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
      position: "HR Manager, ABC Industries",
      image: "/header/anna-james.jpg",
      dob: "07/08/2001",
    },
    "67890": {
      name: "John Doe",
      position: "Software Engineer, XYZ Tech",
      image: "/header/john-doe.jpeg",
      dob: "12/11/1995",
    },
    // Add more profiles as needed
  };

  // Select profile based on employeeCode, or use a default profile if not found
  const profile = employeeProfiles[employeeCode] || {
    name: "Unknown",
    position: "N/A",
    image: "/header/default.jpg",
    dob: "N/A",
  };

  const { name, position, image, dob } = profile;

  return (
    <div className="bg-white p-4 shadow-md ml-12 md:ml-0 rounded-md w-10/12 md:w-2/6 text-center">
      <img src={image} alt={name} className="mx-auto rounded-full w-24 h-24" />
      <h2 className="mt-2 text-lg font-semibold">{name}</h2>
      <p className="text-gray-500">{position}</p>
      <p>{dob}</p>
    </div>
  );
};

export default ProfileCard;
