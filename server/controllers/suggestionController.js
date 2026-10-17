const Suggestion = require('../models/Suggestion');
const suggestNutrition = require('../utils/suggestNutrition');

const buildMeals = ({ calories, macros }) => {
    const lunchProteinTarget = Math.round(macros.protein * 0.4);
    // Approximate protein from 1 cup cooked lentils, 1 cup cooked rice,
    // and 1 cup mixed vegetables. Food and preparation values vary.
    const lunchBaseProtein = 25;
    const additionalProtein = Math.max(0, lunchProteinTarget - lunchBaseProtein);
    const roundUpToTen = (grams) => Math.ceil(grams / 10) * 10;
    const chickenGrams = roundUpToTen((additionalProtein / 32) * 100);
    const paneerGrams = roundUpToTen((additionalProtein / 16) * 100);
    const lunchProteinOption = additionalProtein > 0
        ? `Choose one to approach the ${lunchProteinTarget}g protein target: about ${chickenGrams}g cooked chicken breast OR ${paneerGrams}g paneer.`
        : `The suggested rice, dal, and vegetables provide about ${lunchBaseProtein}g protein; adjust portions to suit the ${lunchProteinTarget}g target.`;

    return [
        {
            type: 'Breakfast',
            items: ['oats', 'banana', 'Greek yogurt'],
            calories: Math.round(calories * 0.3),
            macros: {
                protein: Math.round(macros.protein * 0.3),
                carbs: Math.round(macros.carbs * 0.35),
                fats: Math.round(macros.fats * 0.25)
            }
        },
        {
            type: 'Lunch',
            items: [
                'Rice (1 cup cooked, about 4g protein)',
                'Dal (1 cup cooked, about 18g protein)',
                'Mixed vegetables (1 cup, about 3g protein)',
                lunchProteinOption
            ],
            calories: Math.round(calories * 0.4),
            macros: {
                protein: lunchProteinTarget,
                carbs: Math.round(macros.carbs * 0.4),
                fats: Math.round(macros.fats * 0.4)
            }
        },
        {
            type: 'Dinner',
            items: ['roti or quinoa', 'paneer or lean protein', 'salad'],
            calories: Math.round(calories * 0.3),
            macros: {
                protein: Math.round(macros.protein * 0.3),
                carbs: Math.round(macros.carbs * 0.25),
                fats: Math.round(macros.fats * 0.35)
            }
        }
    ];
};

/**
 * @desc Generate and save nutrition suggestion based on user profile
 * @route POST /api/suggestions/generate
 */
const generateUserSuggestion = async (req, res) => {
    try {
        const profileData = {
            ...req.user.toObject(),
            ...req.body
        };
        const nutritionData = suggestNutrition(profileData);

        const newSuggestion = new Suggestion({
            user: req.user._id,
            dailyCalories: nutritionData.calories,
            macros: nutritionData.macros,
            recommendations: nutritionData.suggestionText,
            meals: buildMeals(nutritionData)
        });

        await req.user.updateOne({
            age: profileData.age,
            gender: profileData.gender,
            weight: profileData.weight,
            height: profileData.height,
            activityLevel: profileData.activityLevel,
            goal: profileData.goal
        });

        const savedSuggestion = await newSuggestion.save();
        res.status(201).json(savedSuggestion);
    } catch (error) {
        res.status(400).json({ message: error.message || 'Error generating suggestion' });
    }
};

/**
 * @desc Get all suggestions for the logged-in user
 * @route GET /api/suggestions/history
 */
const getSuggestionHistory = async (req, res) => {
    try {
        const history = await Suggestion.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching history' });
    }
};

/**
 * @desc Get latest suggestion for the logged-in user
 * @route GET /api/suggestions/latest
 */
const getLatestSuggestion = async (req, res) => {
    try {
        const latest = await Suggestion.findOne({ user: req.user._id }).sort({ createdAt: -1 });

        if (!latest) {
            return res.status(404).json({ message: 'No suggestion found' });
        }

        res.json(latest);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching latest suggestion' });
    }
};

module.exports = { generateUserSuggestion, getSuggestionHistory, getLatestSuggestion };
