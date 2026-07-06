/* pages/User/UserData.jsx */
import { useState, useEffect } from 'react';
import axios from 'axios';
import UnavBar from './UnavBar';

const UserData = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserData(res.data);
    };
    fetchUser();
  }, []);

  if (!userData) return <div className="text-center mt-10">Loading profile...</div>;

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <UnavBar />
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold mb-4 text-emerald-700">Account Details</h3>
        <div className="space-y-3">
          <p><span className="font-bold">Name:</span> {userData.name}</p>
          <p><span className="font-bold">Email:</span> {userData.email}</p>
          <hr />
          <p><span className="font-bold">Age:</span> {userData.age || 'Not provided'}</p>
          <p><span className="font-bold">Weight:</span> {userData.weight || 'Not provided'} kg</p>
          <p><span className="font-bold">Height:</span> {userData.height || 'Not provided'} cm</p>
        </div>
      </div>
    </div>
  );
};

export default UserData;
