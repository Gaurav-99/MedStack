const mongoose = require('mongoose');

const VisitSchema = new mongoose.Schema({
    ip: {
        type: String,
        required: true,
    },
    userAgent: {
        type: String,
    },
    page: {
        type: String,
        default: '/',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Visit', VisitSchema);
