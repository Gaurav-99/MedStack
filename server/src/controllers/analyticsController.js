const Visit = require('../models/Visit');
const User = require('../models/User');
const Question = require('../models/Question');
const Answer = require('../models/Answer');

// @desc    Track a visit
// @route   POST /api/analytics/track
// @access  Public
exports.trackVisit = async (req, res, next) => {
    try {
        const { page } = req.body;
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const userAgent = req.get('User-Agent');

        await Visit.create({
            ip,
            userAgent,
            page: page || '/',
        });

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        next(err);
    }
};

// @desc    Get system stats
// @route   GET /api/analytics/stats
// @access  Public (or Admin only if preferred, keeping public for demo)
exports.getStats = async (req, res, next) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // -- Users --
        const totalUsers = await User.countDocuments();
        const newUsersToday = await User.countDocuments({
            createdAt: { $gte: today },
        });

        // -- Visits --
        const totalVisits = await Visit.countDocuments();
        const visitsToday = await Visit.countDocuments({
            createdAt: { $gte: today },
        });

        // -- Content --
        const totalQuestions = await Question.countDocuments();
        const totalAnswers = await Answer.countDocuments();

        res.status(200).json({
            success: true,
            data: {
                users: {
                    total: totalUsers,
                    newToday: newUsersToday,
                },
                visits: {
                    total: totalVisits,
                    today: visitsToday,
                },
                content: {
                    questions: totalQuestions,
                    answers: totalAnswers,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};
