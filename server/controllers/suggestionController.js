const Suggestion = require('../models/Suggestion');
const suggestNutrition = require('../utils/suggestNutrition');

const buildMeals = ({ calories, macros }, dietType = 'vegetarian') => {
    // Rounded planning estimates; actual values vary by food, brand, and cooking method.
    const proteinPer100g = {
        oats: 13,
        banana: 1.1,
        egg: 12.6,
        greekYogurt: 10,
        almonds: 21,
        cookedRice: 2.7,
        cookedDal: 9,
        vegetables: 2,
        cookedChicken: 30,
        paneer: 20,
        cookedQuinoa: 4.4,
        salad: 2
    };
    const servingToTarget = (target, baseProtein, density, step = 5) => {
        const remainingProtein = Math.max(0, target - baseProtein);
        return Math.ceil((remainingProtein / (density / 100)) / step) * step;
    };
    const proteinForServing = (grams, density) => Math.round(grams * density / 100);
    const proteinOption = (target, baseProtein) => {
        if (target <= baseProtein) {
            return `The base foods provide about ${Math.round(baseProtein)} g protein, already meeting the ${target} g meal target; skip the extra protein option.`;
        }
        if (dietType === 'non-vegetarian') {
            const grams = servingToTarget(target, baseProtein, proteinPer100g.cookedChicken);
            return `Cooked chicken breast — ${grams} g (~${proteinForServing(grams, proteinPer100g.cookedChicken)} g protein; ~30 g per 100 g).`;
        }
        const grams = servingToTarget(target, baseProtein, proteinPer100g.paneer);
        return `Paneer — ${grams} g (~${proteinForServing(grams, proteinPer100g.paneer)} g protein; ~20 g per 100 g).`;
    };

    const breakfastProteinTarget = Math.round(macros.protein * 0.3);
    const breakfastEggCount = breakfastProteinTarget >= 19 ? 2 : 1;
    const breakfastBaseProtein = proteinForServing(40, proteinPer100g.oats)
        + proteinForServing(120, proteinPer100g.banana)
        + (dietType === 'non-vegetarian'
            ? breakfastEggCount * (50 * proteinPer100g.egg / 100)
            : proteinForServing(20, proteinPer100g.almonds));
    const yogurtGrams = servingToTarget(breakfastProteinTarget, breakfastBaseProtein, proteinPer100g.greekYogurt, 10);

    const lunchProteinTarget = Math.round(macros.protein * 0.4);
    const lunchBaseProtein = proteinForServing(150, proteinPer100g.cookedRice)
        + proteinForServing(150, proteinPer100g.cookedDal)
        + proteinForServing(150, proteinPer100g.vegetables);

    const dinnerProteinTarget = Math.round(macros.protein * 0.3);
    const dinnerBaseProtein = proteinForServing(150, proteinPer100g.cookedQuinoa)
        + proteinForServing(150, proteinPer100g.salad);

    return [
        {
            type: 'Breakfast',
            items: [
                'Rolled oats, dry — 40 g (~5 g protein)',
                'Banana, edible portion — 120 g (~1 g protein)',
                ...(dietType === 'non-vegetarian'
                    ? [`Large eggs — ${breakfastEggCount} (~${breakfastEggCount * 50} g edible; ~${breakfastEggCount * 6} g protein)`]
                    : ['Almonds — 20 g (~4 g protein)']),
                ...(yogurtGrams > 0 ? [`Plain Greek yogurt — ${yogurtGrams} g (~${proteinForServing(yogurtGrams, proteinPer100g.greekYogurt)} g protein; check the package label, as brands vary)`] : [])
            ],
            calories: Math.round(calories * 0.3),
            macros: {
                protein: breakfastProteinTarget,
                carbs: Math.round(macros.carbs * 0.35),
                fats: Math.round(macros.fats * 0.25)
            }
        },
        {
            type: 'Lunch',
            items: [
                'Cooked rice — 150 g (~4 g protein)',
                'Cooked dal — 150 g (~14 g protein)',
                'Cooked mixed vegetables — 150 g (~3 g protein)',
                proteinOption(lunchProteinTarget, lunchBaseProtein)
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
            items: [
                'Cooked quinoa — 150 g (~7 g protein)',
                'Salad vegetables — 150 g (~3 g protein)',
                proteinOption(dinnerProteinTarget, dinnerBaseProtein)
            ],
            calories: Math.round(calories * 0.3),
            macros: {
                protein: dinnerProteinTarget,
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

        const dietType = profileData.dietType === 'non-vegetarian' ? 'non-vegetarian' : 'vegetarian';
        const newSuggestion = new Suggestion({
            user: req.user._id,
            dailyCalories: nutritionData.calories,
            macros: nutritionData.macros,
            recommendations: nutritionData.suggestionText,
            dietType,
            meals: buildMeals(nutritionData, dietType)
        });

        await req.user.updateOne({
            age: profileData.age,
            gender: profileData.gender,
            weight: profileData.weight,
            height: profileData.height,
            activityLevel: profileData.activityLevel,
            goal: profileData.goal,
            dietType
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
