import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/data/Users/', {
        username,
        password,
        email
      });
      alert("Registered successfully!");
      window.location.href = "/login";
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Registration failed! Check the console for details.");
    }
  };

  return (
    <div className="card p-3">
      <h3>Register</h3>
      <input
        className="form-control mb-2"
        placeholder="Username"
        onChange={e => setUsername(e.target.value)}
      />
      <input
        className="form-control mb-2"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />
      <input
        className="form-control mb-2"
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />
      <button className="btn btn-success" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
}
