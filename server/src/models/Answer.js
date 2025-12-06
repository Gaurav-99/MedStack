const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
    body: {
        type: String,
        required: [true, 'Please add an answer body'],
    },
    htmlBody: String,
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    votes: {
        up: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        down: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
    isAccepted: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Answer', AnswerSchema);
