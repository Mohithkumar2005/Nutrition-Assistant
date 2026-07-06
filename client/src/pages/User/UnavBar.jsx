/* pages/User/UnavBar.jsx */
import { Link } from 'react-router-dom';

const UnavBar = () => {
  return (
    <div className="flex border-b mb-6">
      <Link to="/profile" className="px-4 py-2 border-b-2 border-emerald-600 text-emerald-600 font-medium">My Stats</Link>
      <Link to="/plans/suggested" className="px-4 py-2 text-gray-500 hover:text-emerald-600 transition">My Plans</Link>
    </div>
  );
};

export default UnavBar;