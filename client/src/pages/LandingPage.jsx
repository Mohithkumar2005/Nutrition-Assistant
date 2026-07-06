/* pages/LandingPage.jsx */
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6">
        Eat Smarter. <br /> <span className="text-emerald-600">Live Better.</span>
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mb-8">
        Get personalized nutrition plans and daily suggestions based on your body metrics and fitness goals.
      </p>
      <div className="space-x-4">
        <Link to="/register" className="bg-emerald-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-emerald-700 transition shadow-lg">
          Get Started
        </Link>
        <Link to="/login" className="bg-white text-emerald-600 border border-emerald-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-emerald-50 transition">
          Login
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;