const Tag = require('../models/Tag');

// @desc    Get all tags
// @route   GET /api/v1/tags
// @access  Public
exports.getTags = async (req, res, next) => {
    try {
        const tags = await Tag.find().sort('name');
        res.status(200).json({ success: true, count: tags.length, data: tags });
    } catch (err) {
        next(err);
    }
};

// @desc    Create a tag
// @route   POST /api/v1/tags
// @access  Private (Admin/Mod?) - Users can create for now? 
// Prompt says: "Tag pages...". Usually high rep users or admins create tags. 
// I'll allow functionality for authorized users.
exports.createTag = async (req, res, next) => {
    try {
        const tag = await Tag.create(req.body);
        res.status(201).json({ success: true, data: tag });
    } catch (err) {
        next(err);
    }
};
