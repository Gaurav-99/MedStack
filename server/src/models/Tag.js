const mongoose = require('mongoose');
const slugify = require('slugify');

const TagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a tag name'],
        unique: true,
        trim: true,
    },
    description: String,
    slug: String,
    followersCount: {
        type: Number,
        default: 0,
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

// Create tag slug from the name
TagSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

module.exports = mongoose.model('Tag', TagSchema);
