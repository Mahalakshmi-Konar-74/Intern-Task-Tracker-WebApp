import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      let res = await axios.post('http://127.0.0.1:8000/api/token/', {
        username,
        password
      });

      // Store the access token in localStorage
      localStorage.setItem('token', res.data.access);

      alert("Login successful!");
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Login failed! Check username/password.");
    }
  };

  return (
    <div className="card p-3">
      <h3>Login</h3>
      <input
        className="form-control mb-2"
        placeholder="Username"
        onChange={e => setUsername(e.target.value)}
      />
      <input
        className="form-control mb-2"
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
  );
}
