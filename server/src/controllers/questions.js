const Question = require('../models/Question');
const Answer = require('../models/Answer');
const User = require('../models/User');

// @desc    Get all questions (with search/filter)
// @route   GET /api/v1/questions
// @access  Public
exports.getQuestions = async (req, res, next) => {
    try {
        let query;

        const reqQuery = { ...req.query };

        // Fields to exclude
        const removeFields = ['select', 'sort', 'page', 'limit', 'search'];
        removeFields.forEach(param => delete reqQuery[param]);

        // Create query string
        let queryStr = JSON.stringify(reqQuery);

        // Create operators ($gt, $gte, etc)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

        // Parse back to JSON
        let filter = JSON.parse(queryStr);

        // Search logic
        if (req.query.search) {
            filter.$or = [
                { title: { $regex: req.query.search, $options: 'i' } },
                { body: { $regex: req.query.search, $options: 'i' } }
            ];
        }

        // Finding resource
        query = Question.find(filter).populate('author', 'name avatarUrl reputation badge').populate('tags', 'name slug');

        // Sort
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        // Executing query
        const questions = await query;

        res.status(200).json({
            success: true,
            count: questions.length,
            data: questions
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get single question
// @route   GET /api/v1/questions/:id
// @access  Public
exports.getQuestion = async (req, res, next) => {
    try {
        const question = await Question.findById(req.params.id)
            .populate('author', 'name avatarUrl reputation badge')
            .populate('tags', 'name slug');

        if (!question) {
            return res.status(404).json({ success: false, error: 'Question not found' });
        }

        // Get answers for this question
        const answers = await Answer.find({ question: req.params.id })
            .populate('author', 'name avatarUrl reputation badge')
            .sort('-votes.up.length -createdAt'); // Simple mock sort by votes then date

        // Return combined or separate? Usually detailed view includes answers.
        // I'll attach answers to the response object primarily or let client fetch.
        // RESTful usually returns the resource. Answers are sub-resources.
        // For convenience in this "view" driven app, I'll return them.

        const questionObj = question.toObject();
        questionObj.answers = answers;

        res.status(200).json({
            success: true,
            data: questionObj
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Create new question
// @route   POST /api/v1/questions
// @access  Private
exports.createQuestion = async (req, res, next) => {
    try {
        // Add user to req.body
        req.body.author = req.user.id;

        // TODO: Handle Tags (convert strings to ObjectIDs, create if not exist?)
        // For MVP, assuming client sends array of Tag IDs or we implement tag creation logic here.
        // User requested "Tag pages", "Tag system".
        // I will assume for now simplest: client sends IDs or I handle lookup.
        // Let's assume client sends IDs for now to keep it strict, or implement a "findOrCreate" for tags logic.
        // I'll skip complex tag logic for this exact step and assume body has correct format.

        const question = await Question.create(req.body);

        res.status(201).json({
            success: true,
            data: question
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Add answer to question
// @route   POST /api/v1/questions/:id/answers
// @access  Private
exports.addAnswer = async (req, res, next) => {
    try {
        req.body.question = req.params.id;
        req.body.author = req.user.id;

        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ success: false, error: 'Question not found' });
        }

        const answer = await Answer.create(req.body);

        res.status(201).json({
            success: true,
            data: answer
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Vote on question
// @route   POST /api/v1/questions/:id/vote
// @access  Private
exports.voteQuestion = async (req, res, next) => {
    try {
        const { type } = req.body; // 'up' or 'down'
        if (!['up', 'down'].includes(type)) {
            return res.status(400).json({ success: false, error: 'Invalid vote type' });
        }

        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ success: false, error: 'Question not found' });
        }

        // Logic to toggle vote
        // Remove from both arrays first to clear previous vote
        question.votes.up = question.votes.up.filter(id => id.toString() !== req.user.id);
        question.votes.down = question.votes.down.filter(id => id.toString() !== req.user.id);

        // Add to new array
        if (type === 'up') {
            question.votes.up.push(req.user.id);
            // Reputation logic: +5 to author
            // This should really be transaction or atomic.
            // Also don't upvote own question?
            if (question.author.toString() !== req.user.id) {
                await User.findByIdAndUpdate(question.author, { $inc: { reputation: 5 } });
            }
        } else {
            question.votes.down.push(req.user.id);
            // Reputation logic: -2 to author
            if (question.author.toString() !== req.user.id) {
                await User.findByIdAndUpdate(question.author, { $inc: { reputation: -2 } });
            }
        }

        await question.save();

        res.status(200).json({
            success: true,
            data: question
        });
    } catch (err) {
        next(err);
    }
};
