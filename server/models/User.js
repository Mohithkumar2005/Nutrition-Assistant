const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    age: Number,
    weight: Number,
    height: Number,
    gender: String,
    activityLevel: String,
    goal: String,
    dietType: {
      type: String,
      enum: ["vegetarian", "non-vegetarian"],
      default: "vegetarian",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
