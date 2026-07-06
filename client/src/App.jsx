/* App.jsx */
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import NewPlan from './pages/Plans/NewPlan';
import SuggestedNutrition from './pages/Plans/SuggestedNutrition';
import UserData from './pages/User/UserData.jsx';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/plans/new" element={<NewPlan />} />
          <Route path="/plans/suggested" element={<SuggestedNutrition />} />
          <Route path="/profile" element={<UserData />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;