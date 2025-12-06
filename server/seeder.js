const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load env vars
dotenv.config();

// Load models
const User = require('./src/models/User');
const Question = require('./src/models/Question');
const Answer = require('./src/models/Answer');
const Tag = require('./src/models/Tag');

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Import into DB
const importData = async () => {
    try {
        await User.deleteMany();
        await Question.deleteMany();
        await Answer.deleteMany();
        await Tag.deleteMany();

        console.log('Data Destroyed...');

        // Create Users
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('123456', salt);

        const users = await User.create([
            {
                name: 'John Doe',
                email: 'john@example.com',
                password: hashedPassword,
                role: 'student',
                school: 'Harvard Med',
                year: 'MS3'
            },
            {
                name: 'Jane Admin',
                email: 'admin@example.com',
                password: hashedPassword,
                role: 'admin',
                school: 'Stanford Med',
                year: 'Resident'
            }
        ]);

        console.log('Users Created...');

        // Create Tags
        const tags = await Tag.create([
            { name: 'cardiology', description: 'Heart related' },
            { name: 'neurology', description: 'Brain related' },
            { name: 'pharmacology', description: 'Drugs related' },
            { name: 'anatomy', description: 'Structure related' }
        ]);

        console.log('Tags Created...');

        // Create Questions
        const questions = await Question.create([
            {
                title: 'Difference between dilated and hypertrophic cardiomyopathy?',
                body: 'I am confused about the pathophysiology distinctions. Can someone explain the key differences in echo findings?',
                author: users[0]._id,
                tags: [tags[0]._id],
                viewCount: 15
            },
            {
                title: 'Best resources for learning cranial nerves?',
                body: 'Any mnemonics or reliable sources for memorizing the 12 cranial nerves and their functions?',
                author: users[0]._id,
                tags: [tags[1]._id, tags[3]._id],
                viewCount: 42
            }
        ]);

        console.log('Questions Created...');

        // Create Answer
        await Answer.create({
            body: 'Dilated: systolic dysfunction (eccentric hypertrophy). Hypertrophic: diastolic dysfunction (concentric hypertrophy).',
            question: questions[0]._id,
            author: users[1]._id
        });

        console.log('Answers Created...');

        console.log('Data Imported!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

// Delete data
const deleteData = async () => {
    try {
        await User.deleteMany();
        await Question.deleteMany();
        await Answer.deleteMany();
        await Tag.deleteMany();

        console.log('Data Destroyed...');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    deleteData();
} else {
    importData();
}
