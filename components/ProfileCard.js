import React from 'react';
import Link from 'next/link';

const ProfileCard = ({ user }) => {
    return (
        <div className="bg-white shadow-md rounded-md p-6 m-4 max-w-sm">
            <h2 className="text-xl font-bold mb-2">Hello {user.name}</h2>
            <p className="text-gray-700">Email: {user.email}</p>
            <p className="text-gray-700">Mobile: {user.mobile}</p>
            <p className="text-gray-700">Date of Birth: {user.dob}</p>
            <Link href={`/user/${user.id}`}>
                <button className="text-gray-700 bg-blue-200 px-3 py-3 border rounded-md mt-4">More Information</button>
            </Link>
            
        </div>
    );
};
export default ProfileCard;
