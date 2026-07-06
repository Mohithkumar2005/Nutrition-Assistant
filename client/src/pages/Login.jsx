/* pages/Login.jsx */
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/home');
    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-emerald-600">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full p-3 border rounded focus:outline-emerald-500"
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full p-3 border rounded focus:outline-emerald-500"
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required
        />
        <button className="w-full bg-emerald-600 text-white p-3 rounded font-bold hover:bg-emerald-700">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
