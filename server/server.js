require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./db/config");
const userRoutes = require("./routes/userRoute");
const suggestionRoutes = require("./routes/suggestionRoute");

const app = express();
let databaseConnection;

function ensureDatabaseConnection() {
  if (!databaseConnection) {
    databaseConnection = connectDB().catch((error) => {
      databaseConnection = undefined;
      throw error;
    });
  }
  return databaseConnection;
}

app.use(express.json());
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim());
app.use(cors({ origin: allowedOrigins }));

app.get("/api", (req, res) => {
  res.send("Nutrition Assistant API is running");
});

app.use((req, res, next) => {
  ensureDatabaseConnection().then(() => next()).catch(next);
});

app.use("/api/users", userRoutes);
app.use("/api/suggestions", suggestionRoutes);

const clientDistPath = path.join(__dirname, "../client/dist");
app.use(express.static(clientDistPath));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

const PORT = process.env.PORT || 9000;

if (require.main === module) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET must be set before starting the server");
  }
  ensureDatabaseConnection().then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`);
    });
  });
}

module.exports = app;
