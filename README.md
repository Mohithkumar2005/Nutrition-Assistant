# Nutrition Assistant

Nutrition Assistant is a full-stack MERN web application that helps users generate personalized nutrition plans. Users can register, log in, enter body details and fitness goals, and receive suggested daily calories, macros, and meal recommendations.

## Features

- User registration and login
- JWT-based authentication
- Protected user profile
- Personalized nutrition plan generation
- Daily calorie calculation
- Protein, carbs, and fats calculation
- Meal-wise nutrition suggestions
- Latest nutrition suggestion view
- MongoDB database storage
- React frontend served through Express backend

## Tech Stack

**Frontend**
- React.js
- Vite
- React Router
- Axios
- CSS / Tailwind CSS

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token
- bcryptjs
- dotenv
- cors

## Folder Structure

```text
Nutrition-Assistant/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Footer.jsx
│   │   │   ├── MealCard.jsx
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── LandingPage.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Plans/
│   │   │   │   ├── NewPlan.jsx
│   │   │   │   └── SuggestedNutrition.jsx
│   │   │   └── User/
│   │   │       ├── UnavBar.jsx
│   │   │       └── UserData.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
├── server/
│   ├── controllers/
│   │   ├── suggestionController.js
│   │   └── userController.js
│   ├── db/
│   │   └── config.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Suggestion.js
│   │   └── User.js
│   ├── routes/
│   │   ├── suggestionRoute.js
│   │   └── userRoute.js
│   ├── utils/
│   │   └── suggestNutrition.js
│   ├── server.js
│   └── package.json
│
├── package.json
└── README.md
