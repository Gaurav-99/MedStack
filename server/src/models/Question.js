const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    body: {
        type: String,
        required: [true, 'Please add a body'],
    },
    htmlBody: String, // Stored rendered markdown or sanitized HTML
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
    }],
    votes: {
        up: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        down: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
    acceptedAnswer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer',
    },
    viewCount: {
        type: Number,
        default: 0,
    },
    references: [{
        title: String,
        url: String,
    }],
    attachments: [{
        url: String,
        type: { type: String }, // e.g. image/png
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

module.exports = mongoose.model('Question', QuestionSchema);
