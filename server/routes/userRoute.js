const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', (req, res) => {
  res.json({
    message: 'Users API is running',
    routes: ['/api/users/register', '/api/users/login', '/api/users/profile']
  });
});

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected route
router.get('/profile', protect, getUserProfile);

module.exports = router;
