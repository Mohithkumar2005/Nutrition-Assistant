const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema(
  {
    type: String,
    items: [String],
    calories: Number,
    macros: {
      protein: Number,
      carbs: Number,
      fats: Number,
    },
  },
  { _id: false }
);

const SuggestionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    dailyCalories: Number,
    macros: {
      protein: Number,
      carbs: Number,
      fats: Number,
    },
    recommendations: String,
    meals: {
      type: [MealSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Suggestion", SuggestionSchema);
