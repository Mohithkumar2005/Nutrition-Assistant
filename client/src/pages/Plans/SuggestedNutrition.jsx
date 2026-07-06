/* pages/Plans/SuggestedNutrition.jsx */
import { useState, useEffect } from 'react';
import axios from 'axios';
import MealCard from '../../components/MealCard';

const SuggestedNutrition = () => {
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    const fetchPlan = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('/api/suggestions/latest', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPlan(res.data);
      } catch (err) {
        console.error("No plan found");
      }
    };
    fetchPlan();
  }, []);

  if (!plan) return <div className="text-center mt-20">Please generate a plan first.</div>;

  return (
    <div className="container mx-auto p-8">
      <header className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Your Suggested Nutrition</h2>
        <p className="text-gray-500 italic mt-2">
          {plan.recommendations || 'Based on your latest metrics'}
        </p>
        <p className="text-emerald-700 font-semibold mt-2">
          Daily target: {plan.dailyCalories} kcal
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        {plan.meals.map((meal, index) => (
          <MealCard 
            key={index}
            mealType={meal.type}
            foodItems={meal.items}
            calories={meal.calories}
            macros={meal.macros}
          />
        ))}
      </div>
    </div>
  );
};

export default SuggestedNutrition;
