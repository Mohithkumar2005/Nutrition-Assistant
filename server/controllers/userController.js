const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/**
 * Generate JWT Token
 */
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '30d' });
};

/**
 * @desc Register new user
 * @route POST /api/users/register
 */
const registerUser = async (req, res) => {
    console.log("========== REGISTER ROUTE HIT ==========");
    console.log("Request Body:", req.body);

    try {
        const {
            name,
            email,
            password,
            age,
            gender,
            weight,
            height,
            activityLevel,
            goal
        } = req.body;

        console.log("Checking if user exists...");

        const userExists = await User.findOne({ email });

        console.log("User exists:", userExists);

        if (userExists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        console.log("Hashing password...");

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log("Creating user...");

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            age,
            gender,
            weight,
            height,
            activityLevel,
            goal
        });

        console.log("User created successfully!");

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });

    } catch (error) {
        console.error("REGISTER ERROR:");
        console.error(error);

        res.status(500).json({
            message: error.message
        });
    }
};

/**
 * @desc Auth user & get token
 * @route POST /api/users/login
 */
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * @desc Get user profile
 * @route GET /api/users/profile
 */
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

module.exports = { registerUser, loginUser, getUserProfile };