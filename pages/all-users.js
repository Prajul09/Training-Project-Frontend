import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileCard from '@/components/ProfileCard';
import { useRouter } from 'next/router';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://us-central1-flutter-training-93ad2.cloudfunctions.net/TestingAPI/api/getAll')
            .then(response => {
                if (response.data.status === 'Success') {
                    setUsers(response.data.data);
                } else {
                    console.error('Failed to fetch users:', response.data.msg);
                }
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h1 className="w-full text-center mb-4 text-xl mt-10 px-20">All Users Information</h1>

            {loading ? (
                <p>Loading...</p>
            ) : users.length > 0 ? (
                <div className="flex flex-wrap">
                    {users.map((user, index) => (
                        <ProfileCard key={index} user={user} />
                    ))}
                </div>
            ) : (
                <p className='text-center text-red-500 mb-4 text-xl mt-10 px-20'>No users found</p>
            )}

            <div className="ml-60">
                <button onClick={() => router.back()} className="bg-yellow-300 text-gray-700 px-4 py-2 rounded">
                    Previous
                </button>
            </div>
        </div>
    );
};

export default AllUsers;

