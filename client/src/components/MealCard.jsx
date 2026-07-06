/* components/MealCard.jsx */
const MealCard = ({ mealType, foodItems, calories, macros }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 p-5 hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-emerald-700 uppercase tracking-wide">{mealType}</h3>
        <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded">
          {calories} kcal
        </span>
      </div>
      <ul className="text-gray-600 mb-4">
        {foodItems.map((item, index) => (
          <li key={index} className="list-disc ml-4 capitalize">{item}</li>
        ))}
      </ul>
      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100 text-center text-xs">
        <div>
          <p className="font-bold text-gray-800">{macros.protein}g</p>
          <p className="text-gray-400">Protein</p>
        </div>
        <div>
          <p className="font-bold text-gray-800">{macros.carbs}g</p>
          <p className="text-gray-400">Carbs</p>
        </div>
        <div>
          <p className="font-bold text-gray-800">{macros.fats}g</p>
          <p className="text-gray-400">Fats</p>
        </div>
      </div>
    </div>
  );
};

export default MealCard;