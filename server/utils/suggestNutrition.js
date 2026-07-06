/**
 * Utility function to calculate daily nutritional needs
 * Based on Mifflin-St Jeor Equation
 */
const suggestNutrition = (userData) => {
    const weight = Number(userData.weight);
    const height = Number(userData.height);
    const age = Number(userData.age);
    const gender = userData.gender === 'male' ? 'male' : 'female';
    const activityLevel = userData.activityLevel || 'sedentary';
    const goal = userData.goal || 'maintain';

    if (!weight || !height || !age) {
        throw new Error('Please provide valid age, weight, and height.');
    }

    // 1. Calculate Basal Metabolic Rate (BMR)
    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // 2. Adjust for Activity Level
    const activityMultipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725
    };
    let maintenanceCalories = bmr * (activityMultipliers[activityLevel] || 1.2);

    // 3. Adjust for Goal
    let targetCalories;
    if (goal === 'lose') targetCalories = maintenanceCalories - 500;
    else if (goal === 'gain') targetCalories = maintenanceCalories + 500;
    else targetCalories = maintenanceCalories;

    // 4. Calculate Macronutrients (approximate distribution)
    // Protein: 2g per kg, Fats: 25% of calories, Carbs: Remaining
    const protein = weight * 2; 
    const fats = (targetCalories * 0.25) / 9;
    const carbs = (targetCalories - (protein * 4) - (fats * 9)) / 4;

    return {
        calories: Math.round(targetCalories),
        macros: {
            protein: Math.round(protein),
            carbs: Math.round(carbs),
            fats: Math.round(fats)
        },
        suggestionText: `Based on your goal to ${goal}, we recommend a daily intake of ${Math.round(targetCalories)} calories.`
    };
};

module.exports = suggestNutrition;
