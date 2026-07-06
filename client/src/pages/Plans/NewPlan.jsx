/* pages/Plans/NewPlan.jsx */
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewPlan = () => {
  const [stats, setStats] = useState({
    age: '',
    gender: 'female',
    weight: '',
    height: '',
    goal: 'lose',
    activityLevel: 'sedentary'
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('/api/suggestions/generate', stats, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/plans/suggested');
    } catch (err) {
      alert(err.response?.data?.message || "Error generating plan");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-emerald-600 mb-6">Generate Nutrition Plan</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
          <input type="number" min="20" className="w-full p-2 border rounded mt-1" required onChange={(e) => setStats({...stats, weight: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
          <input type="number" min="100" className="w-full p-2 border rounded mt-1" required onChange={(e) => setStats({...stats, height: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input type="number" min="12" className="w-full p-2 border rounded mt-1" required onChange={(e) => setStats({...stats, age: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select className="w-full p-2 border rounded mt-1" onChange={(e) => setStats({...stats, gender: e.target.value})}>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Goal</label>
          <select className="w-full p-2 border rounded mt-1" onChange={(e) => setStats({...stats, goal: e.target.value})}>
            <option value="lose">Weight Loss</option>
            <option value="gain">Muscle Gain</option>
            <option value="maintain">Maintenance</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Activity Level</label>
          <select className="w-full p-2 border rounded mt-1" onChange={(e) => setStats({...stats, activityLevel: e.target.value})}>
            <option value="sedentary">Sedentary</option>
            <option value="light">Light</option>
            <option value="moderate">Moderate</option>
            <option value="active">Active</option>
          </select>
        </div>
        <button className="w-full bg-emerald-600 text-white p-3 rounded-lg font-bold hover:bg-emerald-700 transition">
          Generate Suggestion
        </button>
      </form>
    </div>
  );
};

export default NewPlan;
