import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      let res = await axios.post('http://127.0.0.1:8000/api/login/', {
        email, password
      });
      alert("Login successful!");
      localStorage.setItem('token', res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      alert("Login failed!");
    }
  };

  return (
    <div className="card p-3">
      <h3>Login</h3>
      <input className="form-control mb-2" placeholder="Email" 
        onChange={e => setEmail(e.target.value)} />
      <input className="form-control mb-2" type="password" placeholder="Password" 
        onChange={e => setPassword(e.target.value)} />
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
  );
}
