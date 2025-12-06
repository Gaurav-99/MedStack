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
TagSchema.pre('save', async function () {
    if (this.name) {
        this.slug = slugify(this.name, { lower: true });
    }
});

module.exports = mongoose.model('Tag', TagSchema);
