const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = async (req, res, next) => {
    try {
        const { name, email, password, role, school, year } = req.body;

        // Create user
        // Hash password handled in logic or model? Better in model or here.
        // I will do it here for explicit control or use pre-save hook.
        // Let's do it here for now for simplicity/visibility or move to model if adhering to strict Mongoose patterns.
        // Standard MERN often uses pre-save in User model. I'll add pre-save hook to User model later or do manual hash here.
        // I'll do manual hash here to avoid having to edit the model again right now (although model edit is cleaner).
        // Actually, I didn't add pre-save hook for password in User.js. I'll manual hash.

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword, // Store hashed
            role,
            school,
            year
        });

        sendTokenResponse(user, 200, res);
    } catch (err) {
        // Check for duplicate key
        if (err.code === 11000) {
            return res.status(400).json({ success: false, error: 'Email already exists' });
        }
        next(err);
    }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate email & password
        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'Please provide an email and password' });
        }

        // Check for user
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        sendTokenResponse(user, 200, res);
    } catch (err) {
        next(err);
    }
};

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        next(err);
    }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '30d',
    });

    const options = {
        expires: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days hardcoded for now matching .env example
        ),
        httpOnly: true,
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res
        .status(statusCode)
        // .cookie('token', token, options) // Optional: If using cookies
        .json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatarUrl: user.avatarUrl
            }
        });
};

// @desc    Update user profile
// @route   PUT /api/v1/auth/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
    try {
        const { name, bio, school, year } = req.body;

        const fieldsToUpdate = {};
        if (name) fieldsToUpdate.name = name;
        if (bio !== undefined) fieldsToUpdate.bio = bio;
        if (school) fieldsToUpdate.school = school;
        if (year) fieldsToUpdate.year = year;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            fieldsToUpdate,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        next(err);
    }
};
