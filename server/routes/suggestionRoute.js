const express = require('express');
const router = express.Router();
const { generateUserSuggestion, getSuggestionHistory, getLatestSuggestion } = require('../controllers/suggestionController');
const { protect } = require('../middlewares/authMiddleware');

// All suggestion routes are protected as they belong to a specific user
router.post('/generate', protect, generateUserSuggestion);
router.get('/history', protect, getSuggestionHistory);
router.get('/latest', protect, getLatestSuggestion);

module.exports = router;
