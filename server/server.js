require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./db/config");
const userRoutes = require("./routes/userRoute");
const suggestionRoutes = require("./routes/suggestionRoute");

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
  res.send("Nutrition Assistant API is running");
});

app.use("/api/users", userRoutes);
app.use("/api/suggestions", suggestionRoutes);

const clientDistPath = path.join(__dirname, "../client/dist");
app.use(express.static(clientDistPath));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
