import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const UserDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [userData, setUserData] = useState(null);
  console.log(userData,"userData")

  useEffect(() => {
    if (id) {
      fetch(`https://us-central1-flutter-training-93ad2.cloudfunctions.net/TestingAPI/api/get/${id}`)
        .then((response) => response.json())
        .then((data) => setUserData(data))
        .catch((error) => console.error('Error fetching user details:', error));
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://us-central1-flutter-training-93ad2.cloudfunctions.net/TestingAPI/api/delete/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (response.ok) {
        console.log(result.msg);

        router.push('/all-users');
      } else {
        console.error(result.msg);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-md p-6 max-w-sm">
        <h2 className="text-xl font-bold mb-2">Hello {userData && userData.data && userData.data.name}</h2>
        <p className="text-gray-700">Email: {userData && userData.data && userData.data.email}</p>
        <p className="text-gray-700">Mobile: {userData && userData.data && userData.data.mobile}</p>
        <p className="text-gray-700">Date of Birth: {userData && userData.data && userData.data.dob}</p>
        <button className='bg-red-500 text-white px-4 py-2 rounded text-center mt-3' onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default UserDetails;
