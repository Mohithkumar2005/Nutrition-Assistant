/* pages/Home.jsx */
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto p-8">
      <div className="bg-emerald-50 rounded-2xl p-10 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome back!</h2>
          <p className="text-gray-600 text-lg mb-6">Ready to check your progress or generate a new meal plan?</p>
          <div className="flex gap-4">
            <Link to="/plans/new" className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition">
              New Plan
            </Link>
            <Link to="/plans/suggested" className="bg-white border border-emerald-600 text-emerald-600 px-6 py-2 rounded-lg font-semibold hover:bg-emerald-50 transition">
              View Current Plan
            </Link>
          </div>
        </div>
        <div className="hidden md:block">
           <img src="https://cdn-icons-png.flaticon.com/512/2424/2424410.png" alt="Healthy" className="w-48 h-48 object-contain" />
        </div>
      </div>
    </div>
  );
};

export default Home;