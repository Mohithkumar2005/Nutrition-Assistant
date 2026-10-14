const mongoose = require("mongoose");

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be set before connecting to the database");
  }
  return mongoose.connect(process.env.MONGO_URI);
};

module.exports = connectDB;
