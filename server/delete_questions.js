const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Question = require('./src/models/Question');
const Answer = require('./src/models/Answer');

// Load env vars
dotenv.config({ path: './.env' });

const deleteAllQuestions = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        // Delete all answers first (to avoid orphaned references)
        const answersDeleted = await Answer.deleteMany({});
        console.log(`Deleted ${answersDeleted.deletedCount} answers`);

        // Delete all questions
        const questionsDeleted = await Question.deleteMany({});
        console.log(`Deleted ${questionsDeleted.deletedCount} questions`);

        console.log('All questions and answers removed successfully!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

deleteAllQuestions();
