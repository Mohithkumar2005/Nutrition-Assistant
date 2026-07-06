/* pages/Register.jsx */
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/users/register', formData);
      navigate('/login');
    } catch (err) {
  console.log(err);
  console.log(err.response);
  console.log(err.response?.data);

  alert(
    err.response?.data?.message ||
    err.message ||
    "Registration failed"
  );
}
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-emerald-600">Create Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          placeholder="Full Name" 
          className="w-full p-3 border rounded"
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full p-3 border rounded"
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full p-3 border rounded"
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required
        />
        <button className="w-full bg-emerald-600 text-white p-3 rounded font-bold hover:bg-emerald-700">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
