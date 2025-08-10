import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      let res = await axios.get('http://127.0.0.1:8000/api/profile/', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUser(res.data);
    } catch (err) {
      alert("Failed to load profile!");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="card p-3">
      <h3>User Profile</h3>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Joined:</strong> {user.date_joined}</p>
    </div>
  );
}
