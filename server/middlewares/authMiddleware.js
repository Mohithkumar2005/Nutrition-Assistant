const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware to protect routes and verify the JWT token
 */
const protect = async (req, res, next) => {
    let token;

    // Check if authorization header exists and starts with Bearer
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header (split "Bearer <token>")
            token = req.headers.authorization.split(' ')[1];

            // Verify token using secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');

            // Find user by ID and attach to request object (excluding password)
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token provided' });
    }
};

module.exports = { protect };